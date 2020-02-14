import * as React from 'react';
import { TableBodyFilterContainer, TableCellFilter } from './DataGridFilterRows.styles';
import { BulletCell } from '../DataGridChecked/DataGridChecked.styles';

export const DataGridFilterRows = ({
    rowsFilter,
    columns,
    checked,
    isDropDownContent,
    isConfigurable,
    configurable,
}: any) => {
    if (!rowsFilter) {
        return null;
    }
    const elementHeader = document.getElementById('table-header');
    const getHeaderHeight = elementHeader ? elementHeader.clientHeight + 1 : 0;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return (
        <TableBodyFilterContainer>
            {checked && <BulletCell style={{ zIndex: 300, top: `${getHeaderHeight}px` }} />}
            {isDropDownContent && <BulletCell style={{ zIndex: 300, top: `${getHeaderHeight}px` }} />}
            {columns.map((column: any, index: number) => (
                <TableCellFilter
                    key={index}
                    hidden={column.hidden}
                    pin={column.pin}
                    top={isSafari ? 0 : getHeaderHeight}
                    shiftLeft={column.shiftLeft}
                    >
                    {rowsFilter[column.id] || ' '}
                </TableCellFilter>
            ))}
            {isConfigurable(configurable) && <TableCellFilter top={isSafari ? 0 : getHeaderHeight} />}
        </TableBodyFilterContainer>
    );
};

export default DataGridFilterRows;
