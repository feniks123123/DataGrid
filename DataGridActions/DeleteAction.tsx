import React from 'react';
import { DeleteActionStyle, WrapperIcon } from './DataGridActions.styles';

export const DeleteAction = (props: any) => {
    const { actionDelete } = props;
    if (!actionDelete) {
        return null;
    }

    return <DeleteActionStyle />;
};

export const DeleteRowAction = (props: { actionDelete: any; actionCancel: any; onClick: any; renderIconRemove: any; }) => {
    const { actionDelete, actionCancel, onClick, renderIconRemove } = props;
    if (!actionDelete && actionCancel) {
        return null;
    }

    return (
        <WrapperIcon onClick={onClick}>
            // fix todo icon
            <svg>
                renderIconRemove
            </svg>
        </WrapperIcon>
    );
};
