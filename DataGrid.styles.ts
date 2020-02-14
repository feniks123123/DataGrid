import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

export const TableContainer = styled.table`
    display: table;
    border-spacing: 0;
    table-layout: fixed;
    border-collapse: separate;
    position: relative;
    width: 100%;
    background: #fff;
    * {
        box-sizing: border-box;
    }
`;

export const Hover = styled.tfoot`
    position: absolute;
    width: ${(props) => props.width}px;
    background-color: #fff;
    box-shadow: 0 13px 20px 0 #e9eaea;
    border-radius: 0 0 8px 8px;
    top: 40px;
    bottom: 0;
    transform: translateX(${(props) => props.offsetLeftColumn}px);
    transition: box-shadow 0.4s ease, background-color 0.4s ease;
`;

export const ColGroup = styled.colgroup``;
