import React from 'react';
import { DataGridHeaderActions } from '../DataGridHeaderActions';
import { EditRowAction, DeleteRowAction, CancelRowAction } from '../DataGridActions';

export const DataGridRowsActions = (props) => {
    const {
        editRowId,
        rowState,
        row,
        onSave,
        onEdit,
        onDelete,
        onCancel,
        color,
        actionEdit,
        actionDelete,
        actionCancel,
    } = props;
    const index = color;
    const rowIsEditable = editRowId === row.id;
    const rowUpdate = rowState;

    const handlerSave = () => onSave(rowUpdate, row);
    const handlerEdit = () => onEdit(row.id);
    const handlerDelete = () => onDelete(row, index);
    const onClick = rowIsEditable ? handlerSave : handlerEdit;
    const onClickRemove = rowIsEditable ? onCancel : handlerDelete;

    const renderIcon = rowIsEditable ? 'save' : 'edit';
    const renderIconRemove = rowIsEditable ? 'cross' : 'remove';

    return (
        <DataGridHeaderActions>
            <EditRowAction renderIcon={renderIcon} actionEdit={actionEdit} onClick={onClick} />
            <CancelRowAction actionCancel={actionCancel} actionDelete={actionDelete} />
            <DeleteRowAction
                renderIconRemove={renderIconRemove}
                actionCancel={actionCancel}
                actionDelete={actionDelete}
                onClick={onClickRemove}
                />
        </DataGridHeaderActions>
    );
};

export default DataGridRowsActions;
