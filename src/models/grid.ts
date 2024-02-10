import { ReactElement } from "react";
import { CELL_TYPE } from "../utils/enum";

export type IRow = Record<string, unknown>;

export interface IColumn {
  name: string;
  key: string;
  type: CELL_TYPE;
  width?: number;
  renderer?: (rowData: IRow, value: unknown) => ReactElement;
}
