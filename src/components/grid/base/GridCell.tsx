import { FunctionComponent, ReactElement } from "react";
import { CELL_TYPE, IconSize } from "../../../utils/enum";
import Label from "../../base/Label";
import { colors } from "../../../utils/constants";
import { StyledColumnContainer } from "../../base/StyledContainers";
import { isValidDate } from "../../../utils/commonUtils";
import Icon from "../../base/Icon";
import ic_bitcoin from "../../../assets/icons/ic_bitcoin.png";
import { IRow } from "../../../models/grid";

interface GridCellProps {
  type: CELL_TYPE;
  value: unknown;
  width?: number;
  isHeader?: boolean;
  rowIndex: number;
  rowData: IRow;
  renderer?: (data: IRow, rowIndex: number) => ReactElement;
}

const GridCell: FunctionComponent<GridCellProps> = (props) => {
  switch (props.type) {
    case CELL_TYPE.ICON:
      return (
        <div
          style={{
            width: props.width || 50,
          }}
        >
          (
          <Icon
            src={(props.value as string) || ic_bitcoin}
            size={IconSize.LARGE}
          />
          )
        </div>
      );
    case CELL_TYPE.TEXT:
      if (props.isHeader) {
        return (
          <Label
            text={props.value as string}
            style={{
              color: colors.textDarkGray,
              width: props.width || 200,
            }}
          />
        );
      }
      break;
    case CELL_TYPE.AMOUNT:
      break;
    case CELL_TYPE.DATE_TIME_STAMP:
      if (!isValidDate(props.value)) break;
      else {
        const date = new Date(props.value as string);
        return (
          <StyledColumnContainer
            style={{
              width: props.width || 200,
            }}
          >
            <Label
              text={date.toLocaleDateString()}
              style={{
                fontWeight: 600,
                color: colors.textLightGray,
              }}
            />
            <Label
              text={date.toLocaleTimeString()}
              style={{
                fontWeight: 300,
                color: colors.textLightGray,
              }}
            />
          </StyledColumnContainer>
        );
      }
    default:
  }

  if (props.renderer) {
    return props.renderer(props.rowData, props.rowIndex);
  }

  return (
    <Label
      text="-"
      style={{
        color: colors.textLightGray,
        width: props.width || 200,
      }}
    />
  );
};

export default GridCell;
