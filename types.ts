import { Configurable } from './DataGridActions/DataGridActions.types';

export interface Columns {
    id: string;
    name: string | JSX.Element;
    size?: number;
    fixed?: boolean;
    alignColumn?: string;
    alignCell?: string;
    hidden?: boolean;
    type?: string;
    format?: () => void | null;
    formatStyle?: string | null | boolean;
    pin?: boolean;
    indexArray?: number;
    selectOptions?: any;
    columnSort?: (rows: any, id: string) => void;
    columns?: Columns[];
    title?: string;
}

export interface Rows {
    [x: string]: any;
}

export interface DataGridProps {
    height?: number | string;
    columns: Columns[];
    rows: Rows[];
    sort?: boolean;
    fixed?: boolean;
    drag?: boolean;
    configurable?: Configurable | undefined;
    resize?: boolean;
    actionEdit?: boolean;
    actionDelete?: boolean;
    actionCancel?: boolean;
    onClickRow?: (id: string) => void;
    onSaveRow?: (rowUpdate: any, row: any) => void;
    onDeleteRow?: (rowDelete: any, rowUpdate: any) => void;
    handlerFilter?: (nameColumn: string, value: string) => void;
    handlerConfigurable?: (filter: boolean, visibleColumns: boolean) => void;
    onDoubleClickRow?: (row: any) => void;
    checked?: boolean;
    handlerChecked?: (checkedRows: any) => void;
    checkedRows?: string[];
    onUpdateColumns?: (columns: any) => void;
    columnSort?: (rows: Rows, id: string) => void;
}

export interface DataGridState {
    groupColumns: ColumnsGroup[];
    columns: Columns[];
    rows: Rows[];
    rowsFilter: { [x: number]: JSX.Element } | null;
    checkedFilter: boolean;
    resizeData: any | null; // todo fix
    dragData: any | null;
    idColumnHover: string | number | null;
    sortStatus: {
        columnId: string | number | null;
        direction: string;
    };
    checkedMap: any;
    offsetLeftColumn: number;
    isDropDownContent: boolean;
}

export interface ColumnsGroup {
    columns: any;
    id: any;
    column: number;
    name: string;
    idGroup: string;
    size?: number;
    alignColumn?: string;
}

export interface Expanded {
    idDropDown: number[];
    dropDownOpen: { [id: number]: boolean };
}

export type CustomFilter = (arrays: any, sort: string, id: string | number) => null | void;
export type ColumnFilter = (arrays, id: string | number) => null | CustomFilter;
