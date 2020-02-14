import { Columns, Expanded, Rows } from '../types';
import { Configurable } from '../DataGridActions/DataGridActions.types';

export interface Color {
    color?: number;
    colorChecked?: boolean;
}

export interface DataGridBodyCellProps {
    select?: boolean;
    activeEdit?: boolean;
    input?: boolean;
    alignCell?: string;
    osStyle?: boolean;
    highLight?: boolean;
    columnPin?: boolean;
    color?: number;
    shiftLeft?: number;
    idColumnHover?: boolean;
}

export interface IdMap {
    [id: string]: boolean;
}

export interface DataGridBodyState {
    checkedMap: {} | boolean[];
    editRowId: number | null;
    rowState: { [id: string]: any }[];
    expanded: Expanded;
}

export interface DataGridBodyProps {
    actionEdit: boolean;
    actionDelete: boolean;
    actionCancel: boolean;
    checkedRows?: string[];
    checked: boolean;
    checkRow: (row: Rows, checked: boolean) => void;
    rows: Rows[];
    columns: Columns[];
    rowsFilter?: { [x: number]: JSX.Element } | null;
    isConfigurable: (configurable: Configurable | undefined) => boolean;
    configurable?: Configurable | undefined;
    dragData: null | { [id: string]: any };
    isDropDownContent: boolean;
    onSaveRow?: (rowUpdate: any, row: any) => void;
    onDeleteRow?: (rowDelete: any, rowUpdate: any) => void;
    onDoubleClickRow?: (row: any) => void;
    onClickRow?: (id: string) => void;
}
