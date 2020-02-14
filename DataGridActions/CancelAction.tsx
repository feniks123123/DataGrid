import React from 'react';
import { CancelActionsStyle, WrapperIcon } from './DataGridActions.styles';
import { Icon } from '@fcc/rbo-ui';

export const CancelAction = (props: any) => {
    const { actionDelete, actionCancel } = props;
    if (!actionCancel || Boolean(actionDelete)) {
        return null;
    }

    return <CancelActionsStyle />;
};

export const CancelRowAction = (props) => {
    const { actionCancel, actionDelete, onClick } = props;
    if (!actionCancel || Boolean(actionDelete)) {
        return null;
    }

    return (
        <WrapperIcon onClick={onClick}>
            <Icon design='cross' />
        </WrapperIcon>
    );
};
