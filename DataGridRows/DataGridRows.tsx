import React from 'react';
import { DataGridDropDownBlock } from '../DataGridBody/DataGridBody.styles';
import { DataGridRowsGroup, DataGridExpander } from './DataGridRows.styles';
import { DataGridChecked } from '../DataGridChecked';
import { DataGridCell } from '../DataGridCell';
import { DataGridRowsActions } from '../DataGridRowsActions';
import { DataGridRowDropDown } from '../DataGridRowDropDown';
import { DataGridBodyProps } from '../DataGridBody/DataGridBody.types';
import { DataGridRowsProps } from './DataGridRows.types';

export const DataGridRows = (props: DataGridRowsProps & DataGridBodyProps) => {
    const {
        actionEdit,
        actionDelete,
        checked,
        checkRow,
        isConfigurable,
        configurable,
        expanded: { idDropDown, dropDownOpen },
        checkedMap,
        row,
        color,
        isDropDownContent,
        onDropDown,
    } = props;
    const isRenderAction = actionEdit || actionDelete;

    const onClickRow = () => {
        if (props.onClickRow) {
            props.onClickRow(row.id);
        }
    };

    const onDoubleClickRow = () => {
        if (props.onDoubleClickRow) {
            props.onDoubleClickRow(row);
        }
    };

    const handlerDropDown = () => onDropDown(Number(row.id));

    return (
        <React.Fragment>
            <DataGridRowsGroup
                color={color}
                colorChecked={checkedMap[row.id]}
                id={row.id}
                onClick={onClickRow}
                onDoubleClick={onDoubleClickRow}
                >
                {checked && (
                    <DataGridChecked
                        row={row}
                        checked={checked}
                        checkedMap={checkedMap[row.id] || false}
                        checkRow={checkRow}
                        color={color}
                    />
                )}
                {isDropDownContent && (
                    <DataGridDropDownBlock onClick={handlerDropDown}>
                        {Boolean(row.children) && (
                            <DataGridExpander open={dropDownOpen[row.id] && idDropDown.includes(Number(row.id))}>
                                •
                            </DataGridExpander>
                        )}
                    </DataGridDropDownBlock>
                )}
                <DataGridCell {...props} />
                {isConfigurable(configurable) && <td />}
                {isRenderAction && <DataGridRowsActions {...props} />}
            </DataGridRowsGroup>
            {idDropDown.includes(Number(row.id)) && dropDownOpen[row.id] && <DataGridRowDropDown {...props} />}
        </React.Fragment>
    );
};

export default DataGridRows;
