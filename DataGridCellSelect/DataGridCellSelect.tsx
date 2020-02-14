import React from 'react';
import { Select } from '@fcc/rbo-ui';
import { DataGridBodyCell } from '../DataGridCell/DataGridCell.styles';

export const DataGridCellSelect = ({ id, activeEdit, select, options, columnId, valueEdit, onChange, type }: any) => (
    <DataGridBodyCell id={id} activeEdit={activeEdit} select={select}>
        <Select options={options} name={columnId} value={valueEdit} onChange={onChange[type]} />
    </DataGridBodyCell>
);

export default DataGridCellSelect;
