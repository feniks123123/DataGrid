import React from 'react';
import { DeleteActionStyle, WrapperIcon } from './DataGridActions.styles';
import { Icon } from '@fcc/rbo-ui';

export const DeleteAction = (props: any) => {
    const { actionDelete } = props;
    if (!actionDelete) {
        return null;
    }

    return <DeleteActionStyle />;
};

export const DeleteRowAction = (props) => {
    const { actionDelete, actionCancel, onClick, renderIconRemove } = props;
    if (!actionDelete && actionCancel) {
        return null;
    }

    return (
        <WrapperIcon onClick={onClick}>
            <Icon design={renderIconRemove} />
        </WrapperIcon>
    );
};
