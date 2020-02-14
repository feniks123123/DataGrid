import React from 'react';
import { DataGridBodyContainer } from './DataGridBody.styles';
import { DataGridFilterRows } from '../DataGridFilterRows';
import { DataGridRows } from '../DataGridRows';
import checkValue from '../utils/checkValue';
import { DataGridBodyState, DataGridBodyProps, IdMap } from './DataGridBody.types';
import { Columns, Rows } from '../types';

export class DataGridBody extends React.Component<DataGridBodyProps, DataGridBodyState> {
    constructor(props: DataGridBodyProps) {
        super(props);
        const createState = this.createState(props.columns);
        const checkedMap = this.getMap(this.props.checkedRows);
        this.state = {
            checkedMap,
            editRowId: null,
            rowState: {
                ...createState,
            },
            expanded: {
                idDropDown: [],
                dropDownOpen: {},
            },
        };
    }

    componentDidUpdate(prevProps: Readonly<DataGridBodyProps>, prevState: Readonly<DataGridBodyState>): void {
        const { checkedRows: prevCheckedRows } = prevProps;
        const { checkedRows } = this.props;
        // @ts-ignore
        // todo исправить ts prevCheckedRows undefined
        if (checkedRows && checkedRows.length !== prevCheckedRows.length) {
            const checkedMap = this.getMap(checkedRows);
            this.setState({ checkedMap });
        }
    }

    getMap(ids?: string[]): IdMap {
        if (!ids) {
            return {};
        }

        return ids.reduce<IdMap>((result, id) => {
            result[id] = true;

            return result;
        }, {});
    }

    createState = (columns: Columns[], row?: Rows) => {
        return columns.reduce((acc: any, column: Columns) => {
            let value = null;
            let id = null;
            if (row) {
                id = row.id;
                value = checkValue(row[column.id], column);
            }

            return {
                ...acc,
                id,
                [column.id]: value,
            };
        }, {});
    };

    dropDownHandler = (id: number) => {
        this.setState((prevState: DataGridBodyState) => {
            const dropDownOpen = !prevState.expanded.idDropDown.includes(id);
            const idDropDownSet = new Set([...prevState.expanded.idDropDown, id]);
            if (!dropDownOpen) {
                idDropDownSet.delete(id);
            }

            return {
                ...prevState,
                expanded: {
                    idDropDown: [...idDropDownSet],
                    dropDownOpen: {
                        ...prevState.expanded.dropDownOpen,
                        [id]: dropDownOpen,
                    },
                },
            };
        });
    };

    handlerTableInput = (value: string | number, nameRow: string) => {
        this.setState((prevState: any) => ({
            rowState: {
                ...prevState.rowState,
                [nameRow]: value,
            },
        }));
    };

    handlerTableSelect = (event: any, payload: any) => {
        const { name, value, id } = payload;
        this.setState((prevState: any) => ({
            rowState: {
                ...prevState.rowState,
                [name]: { value, id },
            },
        }));
    };

    handlerSave = (rowUpdate: Rows, row: Rows) => {
        const { onSaveRow } = this.props;
        if (onSaveRow) {
            onSaveRow(rowUpdate, row);
        }
        this.setState({ editRowId: null });
    };

    handlerEdit = (id: number) => {
        const { columns, rows } = this.props;
        const getEditRowValue = rows.find((el: any) => el.id === id);
        this.setState({ editRowId: id, rowState: { ...this.createState(columns, getEditRowValue) } });
    };

    handlerDelete = (row: Rows, index: number) => {
        const { rows, onDeleteRow } = this.props;
        rows.splice(index, 1);
        if (onDeleteRow) {
            onDeleteRow(row, rows);
        }
    };

    handlerCancel = () => {
        this.setState({ editRowId: null });
    };

    render(): React.ReactNode {
        const { columns, rowsFilter, checked, isDropDownContent, rows, configurable, isConfigurable } = this.props;
        return (
            <DataGridBodyContainer id='data-grid-body'>
                {Boolean(rowsFilter) && (
                    <DataGridFilterRows
                        rowsFilter={rowsFilter}
                        columns={columns}
                        checked={checked}
                        configurable={configurable}
                        isConfigurable={isConfigurable}
                        isDropDownContent={isDropDownContent}
                    />
                )}
                {rows.map((row: any, index: number) => (
                    <DataGridRows
                        key={row.id}
                        row={row}
                        color={index}
                        onDropDown={this.dropDownHandler}
                        onTableInput={this.handlerTableInput}
                        onTableSelect={this.handlerTableSelect}
                        onSave={this.handlerSave}
                        onEdit={this.handlerEdit}
                        onDelete={this.handlerDelete}
                        onCancel={this.handlerCancel}
                        {...this.props}
                        {...this.state}
                    />
                ))}
            </DataGridBodyContainer>
        );
    }
}

export default DataGridBody;
