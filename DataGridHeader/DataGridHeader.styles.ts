import styled from 'styled-components';

interface HeaderCellSpanProps {
    alignProps?: string;
}

interface HeaderCellProps {
    sorting: boolean;
    content?: any;
    hidden?: boolean;
    dragging: boolean;
    pin?: boolean;
    leftShift?: number;
    idColumnHover?: string | null;
}

const alignProps: any = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

export const HeaderContainer = styled.tr`
    color: inherit;
    display: table-row;
    outline: none;
    vertical-align: middle;
`;

export const HeaderCell = styled.th<HeaderCellProps>`
    white-space: nowrap;
    overflow: visible;
    line-height: normal;
    position: sticky;
    padding: 0;
    top: 0;
    ${(props) => (props.pin ? `left: ${props.leftShift}px` : '')};
    ${(props) => (props.pin ? 'z-index: 300' : 'z-index: 10')};
    height: 40px;
    background: #ffffff;
    display: table-cell;
`;

export const HeaderCellWrapper = styled.div<HeaderCellSpanProps>`
    display: flex;
    justify-content: ${(props) => (props.alignProps ? alignProps[props.alignProps] : '')};
    align-items: center;
    height: 100%;
    transition: box-shadow 0.4s ease, background-color 0.4s ease;
    color: #aaabad;
    padding: 0 8px;
    &:hover {
        color: #2b2d33;
        border-radius: 8px 8px 0 0;
        box-shadow: inset 0 -1px 0 0 #f4f4f4;
        background-color: #ffffff;
    }
`;

export const HeaderCellContent = styled.div`
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 2px 0 0;
`;

export const HeaderCellSpan = styled.span<HeaderCellSpanProps>`
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    text-align: ${(props) => props.alignProps};
    letter-spacing: 0.3px;
    font-size: 12px;
`;

export const DropDownBlock = styled.th`
    position: sticky;
    top: 0;
    left: 0;
    z-index: 30;
    background: #ffffff;
`;

export const DropDownContent = styled.div``;

export const PinContainer = styled.div`
    position: relative;
    z-index: 35;
`;
