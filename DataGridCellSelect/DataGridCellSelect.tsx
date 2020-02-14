import React from 'react';
import { DataGridBodyCell } from '../DataGridCell/DataGridCell.styles';

export const DataGridCellSelect = ({ id, activeEdit, select, options, columnId, valueEdit, onChange, type }: any) => (
    <DataGridBodyCell id={id} activeEdit={activeEdit} select={select}>
        <select options={options} name={columnId} value={valueEdit} onChange={onChange[type]}>
            {options.map((el, key) => <option key={key} value={el}>{el}</option>)}
        </select>
    </DataGridBodyCell>
);

export default DataGridCellSelect;
