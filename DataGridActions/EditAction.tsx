import React from 'react';
import { EditActionsStyle, WrapperIcon } from './DataGridActions.styles';

export const EditAction = (props: any) => {
    const { actionEdit } = props;
    if (!actionEdit) {
        return null;
    }

    return <EditActionsStyle />;
};

export const EditRowAction = (props: any) => {
    const { actionEdit, onClick, renderIcon } = props;
    if (!actionEdit) {
        return null;
    }

    return (
        <WrapperIcon onClick={onClick}>
            // todo fix icon
            <svg>
                {renderIcon}
            </svg> 
            {/* <Icon design={} /> */}
        </WrapperIcon>
    );
};
