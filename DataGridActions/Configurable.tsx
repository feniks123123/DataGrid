import React from 'react';
import { DataGridSettings } from '../DataGridSettings';

export const Configurable = (props: any) => {
    const { configurable, columns, handlerConfigurable, onChangeColumn, onFilterColumn, isConfigurable } = props;
    if (!isConfigurable(configurable)) {
        return null;
    }

    return (
        <DataGridSettings
            configurable={configurable}
            columns={columns}
            handlerConfigurable={handlerConfigurable}
            onChangeColumn={onChangeColumn}
            onFilterColumn={onFilterColumn}
        />
    );
};

export default Configurable;
