import { FunctionComponent, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  StyledColumnContainer,
  StyledRowContainer,
} from "../base/StyledContainers";
import Icon from "../base/Icon";

import ic_close from "../../assets/icons/ic_close.png";
import Label from "../base/Label";
import Input from "../base/Input";
import { INPUT_TYPE } from "../../utils/enum";
import Button from "../base/Button";
import { DUMMY_MNEMONIC, SELECTORS, colors } from "../../utils/constants";
import styled from "styled-components";
import { isEmpty } from "../../utils/commonUtils";
import { fetchWalletByAddress, fetchWalletByName } from "../../services/wallet";
import { useDispatch } from "react-redux";
import {
  addNewAddressToWalletAction,
  createWalletAction,
} from "../../store/slices/walletSlice";
import { AppDispatch } from "../../store";
import { generateAddressFromMnemonic } from "../../utils/addressGenerator";
import { pushSyncOperationsToQueue } from "../../hooks/useSyncManager";
import { IWalletResponse } from "../../models/transaction";

interface ImportWalletPopupProps {
  onClose: () => void;
}

const StyledCurtain = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${colors.modalCurtain};
`;

const ImportWalletPopup: FunctionComponent<ImportWalletPopupProps> = (
  props
) => {
  const [formData, setFormData] = useState({
    walletName: "",
    mnemonic: "",
    canValidate: false,
    error: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  const closeHandler = useRef(props.onClose);

  const isWalletDetailsValid = () => {
    if (isEmpty(formData.walletName) || isEmpty(formData.mnemonic))
      return false;

    // const isMnemonicValid = bip39.validateMnemonic(formData.mnemonic);
    return true;
  };

  const handleOnSubmit = async () => {
    if (!isWalletDetailsValid()) {
      setFormData((formData) => ({
        ...formData,
        canValidate: true,
        error: true,
      }));
      return;
    }

    const walletAddress = await generateAddressFromMnemonic(formData.mnemonic);
    let walletByName;
    let walletByAddress;

    try {
      walletByName = await fetchWalletByName(formData.walletName);
    } catch (err) {
      walletByName = err;
      console.error(err);
    }

    try {
      walletByAddress = await fetchWalletByAddress(walletAddress);
    } catch (err) {
      walletByAddress = err;
      console.error(err);
    }

    try {
      const payload = {
        name: formData.walletName,
        addresses: [walletAddress],
      };

      let walletResponse: IWalletResponse;
      if (
        !walletByName ||
        walletByName?.["error" as keyof typeof walletByName] ||
        walletByName?.["data" as keyof typeof walletByName]?.["error"]
      ) {
        walletResponse = (await dispatch(createWalletAction(payload)))
          .payload as IWalletResponse;
      } else if (
        !walletByAddress ||
        walletByAddress["error" as keyof typeof walletByAddress] ||
        walletByAddress?.["data" as keyof typeof walletByAddress]?.["error"]
      ) {
        walletResponse = (await dispatch(addNewAddressToWalletAction(payload)))
          .payload as IWalletResponse;
      } else {
        walletResponse = walletByAddress as IWalletResponse;
      }

      pushSyncOperationsToQueue([walletResponse]);
    } catch (err) {
      console.error(err);
    }

    props.onClose();
  };

  const handleAutoGenerateMnemonic = async () => {
    // const mnemonic = bip39.generateMnemonic(256);
    const mnemonic =
      (await window["autoGenerateMnemonic" as keyof typeof window]?.()) ||
      DUMMY_MNEMONIC;
    setFormData((prevFormData) => ({
      ...prevFormData,
      mnemonic,
    }));
  };

  useEffect(() => {
    const onClickOutsideModalHandler = (e: MouseEvent) => {
      const closestPopupContainer = (e.target as Element)?.closest?.(
        `#${SELECTORS.IMPORT_MODAL_ID}`
      );
      if (!closestPopupContainer) {
        closeHandler.current?.();
      }
    };

    window.addEventListener("mousedown", onClickOutsideModalHandler);

    return window.removeEventListener("mousedown", onClickOutsideModalHandler);
  }, []);

  const renderModal = () => {
    return (
      <StyledCurtain>
        <StyledColumnContainer
          id={SELECTORS.IMPORT_MODAL_ID}
          style={{
            width: 550,
            minHeight: 350,
            maxWidth: "80vw",
            maxHeight: "80vh",
            gap: 12,
            padding: 24,
            position: "relative",
            left: "50%",
            top: "50%",
            transform: `translateX(-50%) translateY(-50%)`,
            backgroundColor: colors.modalBg,
            borderRadius: 4,
          }}
        >
          <StyledRowContainer
            style={{
              justifyContent: "flex-end",
              marginBottom: 12,
              gap: 12,
              width: "100%",
            }}
          >
            <Label
              text="Import Wallet"
              style={{
                fontSize: "24px",
                lineHeight: 1.2,
                margin: "auto",
                color: colors.white,
              }}
            />
            <Icon src={ic_close} onClick={() => props.onClose()} />
          </StyledRowContainer>
          <Input
            type={INPUT_TYPE.TEXT}
            title="Enter your wallet name"
            value={formData.walletName}
            onBlur={(updatedWalletName) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                walletName: updatedWalletName,
              }))
            }
          />
          <div
            style={{
              position: "relative",
            }}
          >
            <Input
              type={INPUT_TYPE.LONG_TEXT}
              title="Enter your Mnemonic"
              value={formData.mnemonic}
              onBlur={(updatedMnemonic) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  mnemonic: updatedMnemonic,
                }))
              }
            />
            <Button
              text="Auto generate mnemonic"
              style={{
                color: colors.textGold,
                backgroundColor: "transparent",
                border: "none",
                position: "absolute",
                top: 6,
                right: 0,
                padding: 0,
                fontSize: 10,
              }}
              onClick={handleAutoGenerateMnemonic}
            />
          </div>
          <Button
            text="Submit"
            style={{
              color: colors.white,
              backgroundColor: colors.buttonOrange,
              height: 32,
              width: "fit-content",
              margin: "auto",
            }}
            onClick={() => setTimeout(handleOnSubmit, 100)}
          />
        </StyledColumnContainer>
      </StyledCurtain>
    );
  };

  const modalRoot = document.querySelector("#modal-root");
  return modalRoot ? ReactDOM.createPortal(renderModal(), modalRoot) : null;
};

export default ImportWalletPopup;
