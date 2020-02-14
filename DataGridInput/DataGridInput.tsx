import * as React from 'react';
import { StyledInput } from './DataGridInput.styles';

export const DataGridInput = (props: any) => {
    const { name, value, placeholder } = props;

    const onChange = (event: any) => {
        const newValue = event.target.value;
        const nameInput = event.target.name;
        if (props.onChange) {
            props.onChange(newValue, nameInput);
        }
    };

    return <StyledInput value={value} name={name} id={name} placeholder={placeholder} onChange={onChange} />;
};

export default DataGridInput;
