import styled from 'styled-components';

export const StyledInput = styled.input`
    border: none;
    width: 100%;
    height: 100%;
    background: transparent;
    -webkit-appearance: none;
    position: relative;
    z-index: 2;
    font-size: 14px;
    &:focus {
        outline: none;
    }
    ::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.4);
    }
    ::-moz-placeholder {
        color: rgba(0, 0, 0, 0.4);
    }
    :-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.4);
    }
    :-moz-placeholder {
        color: rgba(0, 0, 0, 0.4);
    }
`;
