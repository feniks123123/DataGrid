import styled from 'styled-components';

interface HeaderGroupsCellProps {
    alignProps?: string;
    content?: any;
}

export const HeaderGroupsContainer = styled.tr`
    color: inherit;
    display: table-row;
    outline: none;
    vertical-align: middle;
`;

export const HeaderGroupsCell = styled.th<HeaderGroupsCellProps>`
    display: table-cell;
    vertical-align: inherit;
    overflow: hidden;
    ${(props) => (props.alignProps ? `justify-content: ${props.alignProps}` : '')};
    ${(props) => (props.content ? 'background: rgba(0,0,0,0.03)' : '')};
    height: 30px;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
`;
