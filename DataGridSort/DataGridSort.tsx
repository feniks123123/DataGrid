import React from 'react';
import { ContainerSorting } from './DataGridSort.style';
import Sorting from '../DataGridSort/images/sorting';

interface SortProps {
    sort: boolean;
    sortStatus: {
        direction: string;
        columnId: number;
    };
    sortColumn: () => void;
    column: any;
}

export const DataGridSort = (props: SortProps) => {
    const { sortColumn, sortStatus, sort, column } = props;
    if (!sort) {
        return null;
    }

    return (
        <ContainerSorting id={column.id} onClick={sortColumn}>
            <Sorting column={column} sort={sort} sortStatus={sortStatus} id={`${column.id}-sort`} />
        </ContainerSorting>
    );
};

export default DataGridSort;
