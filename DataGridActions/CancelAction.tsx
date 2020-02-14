import React from 'react';
import { CancelActionsStyle, WrapperIcon } from './DataGridActions.styles';

export const CancelAction = (props: any) => {
    const { actionDelete, actionCancel } = props;
    if (!actionCancel || Boolean(actionDelete)) {
        return null;
    }

    return <CancelActionsStyle />;
};

export const CancelRowAction = (props: { actionCancel: any; actionDelete: any; onClick: any; }) => {
    const { actionCancel, actionDelete, onClick } = props;
    if (!actionCancel || Boolean(actionDelete)) {
        return null;
    }

    return (
        <WrapperIcon onClick={onClick}>
            // todo fix icon
            <svg>
                cross
            </svg>
        </WrapperIcon>
    );
};
