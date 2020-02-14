import { Expanded } from '../types';
import { Configurable } from '../DataGridActions/DataGridActions.types';

export interface DataGridExpanderProps {
    open: boolean;
}

export interface DataGridRowsProps {
    expanded: Expanded;
    checkedMap;
    rowState: { [id: string]: any };
    color: number;
    editRowId: number | null;
    onTableInput: (value: any, nameRow: any) => void;
    onTableSelect: (event: any, payload: any) => void;
    onDropDown: (id: number) => void;
    onSave: (rowUpdate: any, row: any) => void;
    onEdit: (id: number) => void;
    onDelete: (row: any, index: number) => void;
    onCancel: () => void;
    row: { [id: string]: any };
    isConfigurable: (configurable: Configurable | undefined) => boolean;
}
