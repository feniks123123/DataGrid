import React, { ReactNode } from 'react';
import { ActionsContainer } from './DataGridHeaderActions.styles';

export const DataGridHeaderActions = (props: any) => {
    const { children } = props;

    return (
        <ActionsContainer>
            {children
                .filter((el: ReactNode) => el !== null)
                .map((el: ReactNode) => {
                    return el;
                })}
        </ActionsContainer>
    );
};

export default DataGridHeaderActions;
