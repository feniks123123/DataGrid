import React from 'react';
import { BulletCell } from './DataGridChecked.styles';
import { Rows } from '../types';

interface DataGridCheckedProps {
    checked: boolean;
    row: Rows;
    checkedMap: any;
    color: number;
    checkRow: (rows: Rows, checked: boolean) => void;
}

export const DataGridChecked = (props: DataGridCheckedProps): JSX.Element | null => {
    const { checked, row, checkedMap, color, checkRow } = props;
    const onChange = (event: any, payload: any) => {
        const { value } = payload;
        if (checkRow) {
            checkRow(row, value);
        }
    };
    if (!checked) {
        return null;
    }

    return (
        <BulletCell color={color}>
            <input type='checkbox' checked={checkedMap} name={row.id} onChange={onChange} />
        </BulletCell>
    );
};

export default DataGridChecked;
