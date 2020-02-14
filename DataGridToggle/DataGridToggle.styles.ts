import styled from 'styled-components';

export const ToggleWrapper = styled.div`
    justify-content: center;
    display: flex;
    width: 32px;
    height: 32px;
    transition: box-shadow 0.4s ease, background-color 0.4s ease;
    border-radius: 8px;
    &:hover {
        background-color: #ffffff;
        box-shadow: 0 2px 8px 0 #d5d5d6;
    }
`;

export const Toggle = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: normal;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
`;

export const ToggleContainer = styled.div`
    background: #fff;
    position: absolute;
    border-radius: 2px;
    right: 0;
    top: 32px;
    z-index: 50;
`;
