import * as React from 'react';
import { DataGridCellInput } from '../DataGridCellInput';
import { DataGridCellSelect } from '../DataGridCellSelect';
import { DataGridCellDefault } from '../DataGridCellDefault';

export const DataGridSelectCell = (props: any) => {
    switch (props.type) {
        case 'input': {
            return <DataGridCellInput {...props} key={props.id} />;
        }
        case 'select': {
            return <DataGridCellSelect {...props} key={props.id} />;
        }
        default:
            return <DataGridCellDefault {...props} key={props.id} />;
    }
};

export default DataGridSelectCell;
