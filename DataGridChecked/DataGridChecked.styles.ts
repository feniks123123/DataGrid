import styled from 'styled-components';

interface BulletCellProps {
    color?: number;
    border?: boolean;
    sticky?: boolean;
    header?: boolean;
}

export const BulletCell = styled.td<BulletCellProps>`
    padding: 10px 24px;
    display: table-cell;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 30;
    text-align: center;
    background: ${(props) => (props.color % 2 ? '#f8f8f8' : '#ffffff')};
    > label {
        height: 20px;
        width: 20px;
        padding: 0;
        display: flex;
    }
`;
