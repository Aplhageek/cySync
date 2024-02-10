import { FunctionComponent } from "react";
import { StyledRowContainer } from "../../base/StyledContainers";
import { IColumn, IRow } from "../../../models/grid";
import GridCell from "./GridCell";

interface GridRowProps {
  columns: IColumn[];
  rowData: IRow;
  rowIndex: number;
}

const GridRow: FunctionComponent<GridRowProps> = (props) => {
  return (
    <StyledRowContainer>
      {props.columns.map((column, index) => (
        <GridCell
          key={`${column.key}_${props.rowIndex}_${props.rowData?.id || index}`}
          width={column.width}
          type={column.type}
          value={props.rowData?.[column.key]}
          isHeader={true}
          renderer={column.renderer}
          rowIndex={props.rowIndex}
          rowData={props.rowData}
        />
      ))}
    </StyledRowContainer>
  );
};

export default GridRow;
