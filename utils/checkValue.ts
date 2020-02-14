export default (value: any, header: any) => {
    if (header.format && header.formatStyle && value !== '-') {
        return (value = header.format(value, header.formatStyle));
    }

    if (header.format && header.formatStyle === null && value !== '-' && value !== 0) {
        return (value = header.format(value));
    }

    if (Boolean(value) && typeof value !== 'object') {
        return value;
    }

    if (value && value.hasOwnProperty('value')) {
        return value.value;
    }

    if (value && value.hasOwnProperty('$$typeof')) {
        return value;
    }

    if (typeof value === 'number' && value === 0) {
        return value;
    }

    if (!value) {
        return '-';
    }
};
