import { FunctionComponent } from "react";
import Icon from "./Icon";
import ic_loading from "../../assets/icons/ic_loading.png";

interface SpinnerProps {}

const Spinner: FunctionComponent<SpinnerProps> = () => {
  return (
    <Icon
      src={ic_loading}
      style={{
        animation: "loading-logo-spin infinite 3s linear",
        height: 12,
      }}
    />
  );
};

export default Spinner;
