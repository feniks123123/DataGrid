import React from 'react';
import { DataGridContainerHeader } from './DataGridContainerHeader';
import { DataGridBody } from './DataGridBody';
import { DataGridInput } from './DataGridInput';
import { ColGroup, Container, Hover, TableContainer } from './DataGrid.styles';
import { objSort } from './utils/filter';
import { Columns, DataGridProps, Rows, ColumnFilter, DataGridState } from './types';
import { Configurable } from './DataGridActions/DataGridActions.types';

// const Columns = [
//     { name: 'First Name', id: 'firstName', size: 200 },
//     { name: 'Last Name', id: 'lastName', size: 200 },
//     { name: 'Age', id: 'age', size: 200 },
//     { name: 'Test', id: 'test', size: 200 },
//     { name: 'Number2', id: 'number2', size: 200 },
//     { name: 'Number3', id: 'number3', size: 200 },
//     { name: 'Number4', id: 'number4', size: 200 },
//     { name: 'Number5', id: 'number5', size: 200 },
//     { name: 'Number5', id: 'number6', size: 200 },
//     { name: 'Number5', id: 'number7', size: 200 },
//     { name: 'Number5', id: 'number8', size: 200 },
// ];
//
// const Rows = [
//     { firstName: 'test1', lastName: 'test1', age: '23', number: '23', children: [{ age: 3, lastName: 'perception', status: 'single' }] },
//     { firstName: 'test2', lastName: 'test2', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test3', lastName: 'test3', age: '23', number: '23' },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { number3: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
//     { firstName: 'test4', lastName: 'test4', age: '23', number: '23', children: [{ age: 3, firstName: 'series', lastName: 'perception', status: 'single' }] },
// ];

export class DataGrid extends React.Component<DataGridProps, DataGridState> {
    columnSizes: any;
    widthColumn: any | number;
    actionEdit: number;
    actionDelete: number;
    actionCancel: number;
    configurable: number;
    checked: number;
    dropDown: number;

    constructor(props: DataGridProps) {
        super(props);
        this.actionEdit = 40;
        this.actionDelete = 40;
        this.configurable = 72;
        this.actionCancel = 40;
        this.checked = 68;
        this.dropDown = 40;
        const columns = this.collectSecondLevelHeadings(props.columns);
        const isDropDownContent = this.isDropDownContent(props.rows);
        this.columnSizes = this.getColumnSizes(columns);
        this.widthColumn = this.calcWidthColumn(columns);
        const groupColumns = this.determineGroupColumns(props.columns);
        const rows = props.rows;
        this.state = {
            groupColumns,
            columns,
            rows,
            isDropDownContent,
            offsetLeftColumn: 0,
            checkedMap: null,
            rowsFilter: null,
            checkedFilter: false,
            resizeData: null,
            dragData: null,
            idColumnHover: null,
            sortStatus: {
                columnId: null,
                direction: '',
            },
        };
    }

    componentDidMount(): void {
        const { configurable } = this.props;
        if (this.isConfigurable(configurable) && configurable && configurable.filter) {
            this.handleFilterColumn(configurable.filter);
        }
    }

    componentDidUpdate(prevProps: Readonly<DataGridProps>, prevState: Readonly<DataGridState>): void {
        const { columns, rows, onUpdateColumns } = this.props;
        const { rows: prevRows, columns: prevColumns } = prevState;
        const newColumns = this.collectSecondLevelHeadings(columns);

        if (prevColumns.length !== newColumns.length) {
            this.widthColumn = this.calcWidthColumn(newColumns);
            this.columnSizes = this.getColumnSizes(newColumns);
            const groupColumns = this.determineGroupColumns(newColumns);
            this.setState({ groupColumns, columns: newColumns });
            if (onUpdateColumns) {
                onUpdateColumns(newColumns);
            }
        }

        if (prevColumns.length === newColumns.length && JSON.stringify(prevColumns) !== JSON.stringify(newColumns)) {
            const groupColumns = this.determineGroupColumns(newColumns);
            this.setState({ groupColumns, columns: newColumns });
            if (onUpdateColumns) {
                onUpdateColumns(newColumns);
            }
        }

        if (rows !== prevRows) {
            this.setState({ rows });
        }
    }

    checkAll = (event: any, payload: any) => {
        const { checkedRows, handlerChecked } = this.props;
        const { rows } = this.state;
        const { value } = payload;
        if (!handlerChecked) {
            return;
        }
        const currentIds = checkedRows || [];
        const newIds = rows.map((row: Rows) => row.id);
        let ids: string[];
        if (!value) {
            ids = currentIds.filter((orderId) => {
                return !newIds.includes(orderId);
            });

            handlerChecked(ids);
            return;
        }

        ids = [...new Set([...currentIds, ...newIds])];
        handlerChecked(ids);
    };

    getIsCheckedAll = () => {
        const { checkedRows } = this.props;
        const { rows } = this.state;

        if (!checkedRows || !rows.length || checkedRows.length < rows.length) {
            return false;
        }

        const checkedMap = checkedRows.reduce((result, id) => {
            result[id] = true;

            return result;
        }, {});

        return rows.every((row: Rows) => checkedMap[row.id]);
    };

    getIsHasChecked = () => {
        const { checkedRows } = this.props;
        const { rows } = this.state;

        if (!checkedRows || !rows.length) {
            return false;
        }

        return rows.some((row: Rows) => checkedRows.includes(row.id));
    };

    checkRow = (row: Rows, checked?: boolean) => {
        const { checkedRows, handlerChecked } = this.props;

        if (!handlerChecked || !checkedRows) {
            return;
        }

        const ids = checked
            ? [...checkedRows, row.id]
            : checkedRows.filter((checkedOrderId: string): boolean => row.id !== checkedOrderId);

        handlerChecked(ids);
    };

    determineGroupColumns = (columns: Columns[]) =>
        columns.reduce((acc: any, column: Columns) => {
            let result: any[] = [];
            if (column.name === '') {
                result = [...acc, this.generateColumnGroup(column)];
            }
            if (column.columns) {
                result = [...acc, this.generateColumnGroup(column)];
            }

            return result;
        }, []);

    generateColumnGroup = (column: Columns) => ({
        name: column.name,
        idGroup: column.id,
        size: column.columns ? column.columns.length : null,
        alignColumn: column.alignColumn || 'left',
    });

    isDropDownContent = (rows: Rows[]) => {
        let isDropDownContent = false;
        rows.forEach((row) => {
            if (row.children) {
                isDropDownContent = true;
            }
        });
        return isDropDownContent;
    };

    collectSecondLevelHeadings = (columns: Columns[]) => {
        let result: any[] = [];
        return columns.reduce((acc: any, column: Columns, index: number) => {
            if (column.columns) {
                result = [
                    ...acc,
                    ...column.columns.map((col: Columns, indexCol: number) => this.generateColumn(col, indexCol)),
                ];
            }
            if (!column.columns) {
                result = [...acc, this.generateColumn(column, index)];
            }

            return result;
        }, []);
    };

    generateColumn = (col: Columns, index?: number) => ({
        id: col.id,
        name: col.name,
        size: col.size || 100,
        alignColumn: col.alignColumn || 'left',
        alignCell: col.alignCell || 'left',
        hidden: col.hidden || false,
        type: col.type || null,
        format: col.format || null,
        formatStyle: col.formatStyle || null,
        fixed: col.fixed === undefined || col.fixed,
        selectOptions: col.selectOptions || null,
        shiftLeft: 0,
        pin: false,
        indexArray: index,
        columnSort: col.columnSort || null,
        title: this.getJSXElementTextComponent(col.title || col.name),
    });

    calcWidthColumn = (columns: Columns[]) => {
        const { checked, actionEdit, actionDelete, configurable } = this.props;
        if (columns.length) {
            const sizeColumn = columns.filter((col: Columns) => !col.hidden).map((el: any) => el.size);
            const sizeActionEdit = actionEdit ? this.actionEdit : 0;
            const sizeActionDelete = actionDelete ? this.actionDelete : 0;
            const sizeActionCancel = actionDelete ? this.actionCancel : 0;
            const sizeConfigurable = this.isConfigurable(configurable) ? this.configurable : 0;
            const sizeChecked = checked ? this.checked : 0;
            return (
                sizeColumn.reduce((accumulator: any, currentValue: any) => accumulator + currentValue) +
                sizeActionEdit +
                sizeActionDelete +
                sizeActionCancel +
                sizeConfigurable +
                sizeChecked
            );
        }

        return 0;
    };

    calcWidthColumnName = (columnNameSize: any[]) =>
        Object.values(columnNameSize).reduce((accumulator: number, currentValue) => {
            return accumulator + currentValue;
        }, 0);

    getCustomSortIfExist: ColumnFilter = (arrays: any[], id: string | number) => {
        let sort = null;
        arrays.forEach((array) => {
            if (array.id === id && array.columnSort !== null) {
                sort = array.columnSort;
            }
        });
        return sort;
    };

    sortColumn = (event: any) => {
        const { rows, columns } = this.state;
        const {
            sortStatus: { direction },
        } = this.state;
        const id = event.currentTarget.id.split('-')[0];
        const newDirection = direction;

        const getCustomSort = this.getCustomSortIfExist(columns, id);
        if (newDirection === '' || newDirection === 'ASC') {
            const sortedAsc = getCustomSort !== null ? getCustomSort(rows, 'DESC', id) : objSort(rows, id);
            this.setState({ rows: sortedAsc, sortStatus: { columnId: id, direction: 'DESC' } });
        }
        if (newDirection === 'DESC') {
            const sortedDesc = getCustomSort !== null ? getCustomSort(rows, 'ASC', id) : objSort(rows, [id, true]);
            this.setState({ rows: sortedDesc, sortStatus: { columnId: id, direction: 'ASC' } });
        }
    };

    fixedColumn = (event: React.MouseEvent<HTMLElement>) => {
        const { checked } = this.props;
        const { columns } = this.state;
        const columnPin = event.currentTarget.id.split('-')[0];
        const columnsPin: any[] = [];
        const columnsDontPin: any[] = [];
        const isChecked = checked ? this.checked : 0;
        columns.forEach((column: any) => {
            if (column.pin) {
                return columnsPin.push(column);
            }

            if (column.id === columnPin) {
                return columnsPin.push({
                    ...column,
                    pin: true,
                    shiftLeft:
                        columnsPin.length === 0
                            ? isChecked
                            : columnsPin.reduce((acc, res) => acc + res.size, 0) + isChecked,
                });
            }

            return columnsDontPin.push(column);
        });

        const newColumns = [...columnsPin, ...columnsDontPin];
        this.setState({ columns: newColumns });
    };

    dontFixedColumn = (event: React.MouseEvent<HTMLElement>) => {
        const { checked } = this.props;
        const { columns } = this.state;
        const columnPin = event.currentTarget.id.split('-')[0];
        const columnsPin: any[] = [];
        const columnsDontPin: any[] = [];
        const isChecked = checked ? this.checked : 0;
        columns.forEach((column: any) => {
            if (column.pin && column.id !== columnPin) {
                columnsPin.push({
                    ...column,
                    shiftLeft:
                        columnsPin.length === 0
                            ? isChecked
                            : columnsPin.reduce((acc, res) => acc + res.size, 0) + isChecked,
                });
            } else if (column.id === columnPin) {
                columnsDontPin.push({
                    ...column,
                    pin: false,
                });
            } else {
                columnsDontPin.push(column);
            }
        });

        columnsDontPin.sort((columnA, columnB) => columnA.indexArray - columnB.indexArray);
        const newColumns = [...columnsPin, ...columnsDontPin];
        this.setState({ columns: newColumns });
    };

    handleFilterColumn = (checkedFilter: boolean) => {
        const { rows } = this.props;
        if (checkedFilter) {
            const { columns } = this.state;
            const creatFilterRows: { [x: number]: JSX.Element } = {};
            columns.forEach((column: any) => {
                if (typeof column.name !== 'string') {
                    const placeholder = this.getJSXElementTextComponent(column.name);
                    creatFilterRows[column.id] = (
                        <DataGridInput
                            name={column.id}
                            placeholder={placeholder}
                            id={column.id}
                            onChange={this.handleChangeFilterInput}
                        />
                    );
                } else {
                    creatFilterRows[column.id] = (
                        <DataGridInput
                            name={column.id}
                            placeholder={column.name}
                            id={column.id}
                            onChange={this.handleChangeFilterInput}
                        />
                    );
                }
            });
            this.setState({ rowsFilter: creatFilterRows });
        } else {
            this.setState({ rowsFilter: null, rows });
        }
    };

    getJSXElementTextComponent = (text: JSX.Element | string) => {
        let textComponent = text;
        if (typeof text === 'object') {
            if (Array.isArray(text.props.children)) {
                text.props.children.forEach((el) => {
                    if (typeof el.props.children === 'string') {
                        textComponent = el.props.children;
                    }
                });
            } else {
                textComponent = text.props.children;
            }
        }

        return textComponent;
    };

    handleChangeFilterInput = (value: string, nameColumn: string) => {
        if (this.props.handlerFilter) {
            this.props.handlerFilter(nameColumn, value);
        }
    };

    handleChangeColumn = (columns: Columns[]) => {
        const { onUpdateColumns } = this.props;
        this.setState({ columns });
        this.widthColumn = this.calcWidthColumn(columns);
        this.columnSizes = this.getColumnSizes(columns);
        if (onUpdateColumns) {
            onUpdateColumns(columns);
        }
    };

    handleResizeStart = (resizeData: any) => {
        this.setState({ resizeData });
    };

    getColumnSizes = (columns: Columns[]) =>
        columns
            .filter((col: Columns) => !col.hidden)
            .reduce((result: any, column: Columns) => {
                result[column.id] = column.size;

                return result;
            }, {});

    handleResizeEnd = () => {
        const { onUpdateColumns } = this.props;
        const { columns } = this.state;
        const newColumns = columns.map((column: Columns) => {
            if (column.size === this.columnSizes[column.id]) {
                return column;
            }

            return {
                ...column,
                size: this.columnSizes[column.id] || 100,
            };
        });
        const hover = document.getElementById(`hover`) as HTMLDivElement;

        if (hover !== null) {
            hover.removeAttribute('style');
        }

        this.setState({
            resizeData: null,
            columns: newColumns,
        });
        if (onUpdateColumns) {
            onUpdateColumns(newColumns);
        }
    };

    handleMouseMove = ({ clientX }: React.MouseEvent<HTMLElement>) => {
        const { resizeData } = this.state;
        const minWidthColumn = 60;
        if (!resizeData) {
            return;
        }
        const { columnId, position, width, columnSize } = this.state.resizeData;
        const table = document.getElementById('table') as HTMLTableElement;
        const columnIdCurrent = document.getElementById(`${columnId}-col`) as HTMLTableColElement;
        const hover = document.getElementById(`hover`) as HTMLDivElement;
        const newSize = width + clientX - position;
        const totalSize = Math.max(columnSize + newSize, minWidthColumn);
        this.columnSizes[columnId] = totalSize;
        this.widthColumn = this.calcWidthColumnName(this.columnSizes);
        if (columnIdCurrent !== null) {
            columnIdCurrent.width = `${totalSize}px`;
        }
        if (table !== null) {
            table.style.minWidth = `${this.widthColumn}px`;
        }
        if (hover !== null) {
            hover.style.width = `${totalSize}px`;
        }
    };

    handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
        const { idColumnHover } = this.state;
        const id = event.currentTarget.id;
        const offsetLeft = event.currentTarget.offsetLeft;
        if (idColumnHover !== id) {
            this.setState({ idColumnHover: id, offsetLeftColumn: offsetLeft });
        }
    };

    handleMouseOut = () => {
        this.setState({ idColumnHover: null });
    };

    expandFileName = (event) => {
        const id = event.currentTarget.id;
        const lengthText = event.currentTarget.textContent.length;
        const widthColumn = lengthText * 10;
        this.columnSizes[id] = widthColumn <= 100 ? 100 : widthColumn;
        this.widthColumn = this.calcWidthColumnName(this.columnSizes);
    };

    handleDragStart = (dragData: any) => {
        this.setState({ dragData });
    };

    handleDragEnd = () => {
        this.setState({ dragData: null });
    };

    handleUpdateColumns = (columns: Columns[]) => {
        const { onUpdateColumns } = this.props;
        const newColumns = this.collectSecondLevelHeadings(columns);
        this.setState({ columns: newColumns });
        if (onUpdateColumns) {
            onUpdateColumns(newColumns);
        }
    };

    isConfigurable = (configurable: Configurable | undefined) =>
        typeof configurable === 'object' && Object.keys(configurable).length !== 0;

    render(): React.ReactNode {
        const {
            groupColumns,
            columns,
            rows,
            isDropDownContent,
            sortStatus,
            rowsFilter,
            checkedMap,
            dragData,
            resizeData,
            idColumnHover,
            offsetLeftColumn,
        } = this.state;
        const {
            sort = false,
            fixed = false,
            checked = false,
            actionEdit = false,
            actionDelete = false,
            actionCancel = false,
            configurable,
            checkedRows,
            onClickRow,
            handlerConfigurable,
            onDoubleClickRow,
            onSaveRow,
            onDeleteRow,
            drag,
            height,
            resize,
            ...attrs
        } = this.props;
        const getColumnWidth = idColumnHover !== null ? this.columnSizes[idColumnHover] : 0;
        const minWidth = `${this.widthColumn}px`;
        return (
            <Container {...attrs} style={{ height }} id='table-container'>
                <TableContainer style={{ minWidth }} id='table'>
                    <ColGroup>
                        {checked && <col id='checked-col' style={{ width: this.checked }} />}
                        {isDropDownContent && <col id='dropDown-col' style={{ width: this.dropDown }} />}
                        {columns
                            .filter((el: any) => !el.hidden)
                            .map((column: any, index: number) => (
                                <col key={index} id={`${column.id}-col`} width={`${this.columnSizes[column.id]}px`} />
                            ))}
                        {actionEdit && <col id='actionEdit-col' style={{ width: this.actionEdit }} />}
                        {actionCancel && <col id='actionCancel-col' style={{ width: this.actionCancel }} />}
                        {actionDelete && <col id='actionDelete-col' style={{ width: this.actionDelete }} />}
                        {this.isConfigurable(configurable) && (
                            <col id='configurable-col' style={{ width: this.configurable }} />
                        )}
                    </ColGroup>
                    <DataGridContainerHeader
                        {...{
                            groupColumns,
                            columns,
                            configurable,
                            handlerConfigurable,
                            rows,
                            sort,
                            checked,
                            checkedMap,
                            fixed,
                            drag,
                            actionEdit,
                            actionDelete,
                            actionCancel,
                            dragData,
                            sortStatus,
                            isDropDownContent,
                            resize,
                            resizing: Boolean(resizeData),
                            minWidth,
                            idColumnHover,
                            onChangeColumn: this.handleChangeColumn,
                            onFilterColumn: this.handleFilterColumn,
                            checkAll: this.checkAll,
                            hasChecked: this.getIsHasChecked,
                            checkedAll: this.getIsCheckedAll,
                            onDragStart: this.handleDragStart,
                            onDragEnd: this.handleDragEnd,
                            fixedColumn: this.fixedColumn,
                            dontFixedColumn: this.dontFixedColumn,
                            sortColumn: this.sortColumn,
                            onMouseMove: this.handleMouseMove,
                            columnSizes: this.columnSizes,
                            onResizeStart: this.handleResizeStart,
                            onResizeEnd: this.handleResizeEnd,
                            onUpdateColumns: this.handleUpdateColumns,
                            expandFileName: this.expandFileName,
                            onMouseOver: this.handleMouseOver,
                            onMouseOut: this.handleMouseOut,
                            isConfigurable: this.isConfigurable,
                        }}
                    />
                    <DataGridBody
                        {...{
                            checkRow: this.checkRow,
                            checkedWidth: this.checked,
                            dropDownWidth: this.dropDown,
                            isConfigurable: this.isConfigurable,
                            actionEdit,
                            actionDelete,
                            actionCancel,
                            rows,
                            columns,
                            rowsFilter,
                            configurable,
                            checked,
                            checkedRows,
                            dragData,
                            isDropDownContent,
                            onSaveRow,
                            onDeleteRow,
                            onDoubleClickRow,
                            onClickRow,
                        }}
                    />
                    <Hover width={getColumnWidth} id='hover' offsetLeftColumn={offsetLeftColumn} />
                </TableContainer>
            </Container>
        );
    }
}

export default DataGrid;
