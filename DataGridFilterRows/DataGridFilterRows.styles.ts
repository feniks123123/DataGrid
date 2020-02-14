import styled, { css } from 'styled-components';

interface TableBodyCellFilterProps {
    pin?: boolean;
    shiftLeft?: number;
    top?: number;
}

export const TableBodyFilterContainer = styled.tr`
    display: table-row;
`;

export const TableCellFilter = styled.td<TableBodyCellFilterProps>`
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 7px 5px;
    overflow: hidden;
    border-right: 1px solid rgba(0, 0, 0, 0.02);
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: ${(props) => props.top}px;
    z-index: 100;
    background: whitesmoke;
    display: ${(props) => (props.hidden ? 'none' : 'table-cell')};
    ${(props) =>
        props.pin &&
        css`
            left: ${props.shiftLeft}px;
            z-index: 300;
        `}
`;
