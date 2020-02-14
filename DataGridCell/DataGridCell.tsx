import { DataGridSelectCell } from '../DataGridSelectCell';
import checkValue from '../utils/checkValue';

export const DataGridCell = (props: { columns: any; dragData: any; editRowId: any; row: any; rowState: any; handlerTableInput: any; handlerSelect: any; color: any; }) => {
    const { columns, dragData, editRowId, row, rowState, handlerTableInput, handlerSelect, color } = props;
    const rowIsEditable = editRowId === row.id;
    const getColumnClassName = (columnId: string): string => `cell-id-${columnId.replace('.', '_')}`;

    return columns
        .filter((column: any) => column !== null)
        .map((column: any) => {
            if (column.hidden) {
                return;
            }
            const columnId = column.id;
            const columnPin = column.pin;
            const alignCell = column.alignCell;
            const shiftLeft = column.shiftLeft;
            const columnType = column.type || null;

            const className = columnId ? getColumnClassName(columnId) : '';
            const highLight = Boolean(dragData) && columnId === dragData.column.id;

            const rowId = row.id;
            const id = `${columnId}-${rowId}`;
            // fix value state save handler
            const value = checkValue(row[columnId], column);
            const options = column.selectOptions;
            const valueEdit = rowState[columnId] === null ? value : rowState[columnId];
            const activeEdit = editRowId === rowId;

            const headerTypeSelect: any = {
                input: 'input',
                select: 'select',
            };

            const tableSelectCellProps = {
                type: rowIsEditable ? headerTypeSelect[columnType] : null,
                id,
                activeEdit,
                columnId,
                valueEdit,
                onChange: {
                    input: handlerTableInput,
                    select: handlerSelect,
                },
                select: columnType === 'select',
                options,
                highLight,
                className,
                columnPin,
                alignCell,
                shiftLeft,
                color,
                value,
            };

            return DataGridSelectCell(tableSelectCellProps);
        });
};

export default DataGridCell;
