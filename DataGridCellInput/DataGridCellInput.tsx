import React from 'react';
import { DataGridInput } from '../DataGridInput';
import { DataGridBodyCell } from '../DataGridCell/DataGridCell.styles';

export const DataGridCellInput = ({ id, activeEdit, columnId, valueEdit, onChange, type }: any) => (
    <DataGridBodyCell id={id} activeEdit={activeEdit}>
        <DataGridInput name={columnId} value={valueEdit} id={columnId} onChange={onChange[type]} />
    </DataGridBodyCell>
);

export default DataGridCellInput;
