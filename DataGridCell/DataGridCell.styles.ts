import styled, { css } from 'styled-components';
import { DataGridBodyCellProps } from '../DataGridBody/DataGridBody.types';

export const DataGridBodyCell = styled.td<DataGridBodyCellProps>`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: ${(props) => (props.select ? '' : 'hidden')};
    text-align: ${(props) => props.alignCell};
    display: table-cell;
    padding: 0 8px;
    position: relative;
    z-index: 2;
    ${({ highLight }) =>
        highLight &&
        css`
            background-color: #fff9c4;
        `};
    ${(props) =>
        props.columnPin &&
        css`
            position: sticky;
            z-index: 200;
            left: ${props.shiftLeft}px;
            background: ${props.color % 2 ? '#f8f8f8' : '#ffffff'};
        `};
`;
