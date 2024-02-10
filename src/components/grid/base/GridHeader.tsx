import { FunctionComponent } from "react";
import { StyledRowContainer } from "../../base/StyledContainers";
import { IColumn } from "../../../models/grid";
import GridCell from "./GridCell";
import { CELL_TYPE } from "../../../utils/enum";

interface GridHeaderProps {
  columns: IColumn[];
}

const GridHeader: FunctionComponent<GridHeaderProps> = (props) => {
  return (
    <StyledRowContainer>
      {props.columns.map((column) => (
        <GridCell
          key={`header_${column.key}`}
          width={column.width}
          type={CELL_TYPE.TEXT}
          value={column.name}
          isHeader={true}
        />
      ))}
    </StyledRowContainer>
  );
};

export default GridHeader;
