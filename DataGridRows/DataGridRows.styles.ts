import styled from 'styled-components';
import { Color } from '../DataGridBody/DataGridBody.types';
import { DataGridExpanderProps } from './DataGridRows.types';

export const DataGridRowsGroup = styled.tr<Color>`
    width: 100%;
    color: inherit;
    cursor: pointer;
    height: 40px;
    background: ${(props) => (props.color % 2 ? '#f8f8f8' : '#ffffff')};
    background: ${(props) => props.colorChecked && 'rgba(233, 234, 234, 1)'};
    z-index: 2;
    &:hover {
        .table-checked {
            background: rgba(233, 234, 234, 1);
        }
        .cell-id-${(props) => props.id} {
            background: rgba(233, 234, 234, 1);
        }
        background: rgba(233, 234, 234, 1);
    }
`;

export const DataGridExpander = styled.div<DataGridExpanderProps>`
    display: inline-block;
    position: relative;
    color: transparent;
    margin: 0 10px;
    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(${(props) => (props.open ? '0' : '-90deg')});
        border-left: 5.04px solid transparent;
        border-right: 5.04px solid transparent;
        border-top: 7px solid rgba(0, 0, 0, 0.8);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        cursor: pointer;
    }
`;
