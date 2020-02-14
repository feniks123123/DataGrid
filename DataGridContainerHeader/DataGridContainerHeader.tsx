import React from 'react';
import { DataGridHeaderGroups } from '../DataGridHeaderGroups';
import { DataGridHeader } from '../DataGridHeader';
import { ContainerHeader } from './DataGridContainerHeader.styles';

export const DataGridContainerHeader = (props: any) => {
    const checkGroups = Boolean(props.groupColumns) && props.groupColumns.length;
    const checkHeaders = Boolean(props.columns) && props.columns.length;
    return (
        <ContainerHeader id='table-header'>
            {Boolean(checkGroups) && <DataGridHeaderGroups {...props} />}
            {Boolean(checkHeaders) && <DataGridHeader {...props} />}
        </ContainerHeader>
    );
};

export default DataGridContainerHeader;
