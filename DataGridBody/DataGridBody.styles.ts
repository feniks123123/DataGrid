import styled from 'styled-components';
import { DataGridBodyCell } from '../DataGridCell/DataGridCell.styles';
import { DataGridBodyCellProps } from './DataGridBody.types';

export const DataGridBodyContainer = styled.tbody`
    position: relative;
`;

export const DataGridDropDownBlock = styled(DataGridBodyCell)<DataGridBodyCellProps>`
    flex: 35 0 auto;
    width: 35px;
    max-width: 35px;
    cursor: pointer;
`;
