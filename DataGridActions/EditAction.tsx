import React from 'react';
import { EditActionsStyle, WrapperIcon } from './DataGridActions.styles';
import { Icon } from '@fcc/rbo-ui';

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
            <Icon design={renderIcon} />
        </WrapperIcon>
    );
};
