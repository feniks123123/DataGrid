import React from 'react';
import { DataGridBodyCell } from '../DataGridCell/DataGridCell.styles';

export const DataGridCellDefault = ({
    highLight,
    className,
    alignCell,
    columnPin,
    shiftLeft,
    id,
    color,
    value,
    index,
}: any) => {
    return (
        <DataGridBodyCell
            key={index}
            highLight={highLight}
            className={className}
            alignCell={alignCell}
            columnPin={columnPin}
            shiftLeft={shiftLeft}
            id={id}
            color={color}
            >
            {value}
        </DataGridBodyCell>
    );
};

export default DataGridCellDefault;
