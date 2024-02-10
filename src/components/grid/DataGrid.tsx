import { Fragment, FunctionComponent } from "react";
import {
  StyledBorderLine,
  StyledColumnContainer,
} from "../base/StyledContainers";
import Label from "../base/Label";
import GridHeader from "./base/GridHeader";
import GridRow from "./base/GridRow";
import { IColumn, IRow } from "../../models/grid";
import { colors } from "../../utils/constants";

interface DataGridProps {
  customHeader?: string;
  tableName: string;
  totalCount?: number;
  columns: IColumn[];
  rows: IRow[];
}

const DataGrid: FunctionComponent<DataGridProps> = (props) => {
  return (
    <StyledColumnContainer
      style={{
        marginTop: 24,
      }}
    >
      <Label
        text={
          props.customHeader ??
          `Total ${(props.tableName || "")?.toLowerCase()} - ${
            props.totalCount || 0
          }`
        }
        style={{
          color: colors.white,
          fontSize: "0.75em",
        }}
      />
      <StyledBorderLine
        style={{
          margin: "16px 0",
        }}
      />
      {!props.rows?.length ? (
        <Label
          text="No data found!"
          style={{
            color: colors.white,
            width: "100%",
            textAlign: "center",
            margin: "auto",
            fontSize: "0.75em",
          }}
        />
      ) : (
        <Fragment>
          <GridHeader columns={props.columns} />
          {props.rows.map((row, index) => (
            <GridRow rowIndex={index} rowData={row} columns={props.columns} />
          ))}
        </Fragment>
      )}
    </StyledColumnContainer>
  );
};

export default DataGrid;
