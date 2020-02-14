import React from 'react';
import { DataGridBodyRow } from './DataGridRowDropDown.styles';

export const DataGridRowDropDown = (props: { row: any; color: any; checked: any; isDropDownContent: any; dropDownWidth: any; checkedWidth: any; }) => {
    const { row, color, checked, isDropDownContent, dropDownWidth, checkedWidth } = props;
    return (
        <DataGridBodyRow
            color={color}
            colSpan={2}
            isDropDownContent={isDropDownContent}
            checked={checked}
            dropDownWidth={dropDownWidth}
            checkedWidth={checkedWidth}>
            {row.children.map((el: any, key: number) => {
                return <td key={key}>{el}</td>;
            })}
        </DataGridBodyRow>
    );
};

export default DataGridRowDropDown;
