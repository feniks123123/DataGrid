import * as React from 'react';

export default ({ column, sort, sortStatus: { direction, columnId } }: any) => {
    if (!sort) {
        return null;
    }

    let topColor = '#aaabad';
    let bottomColor = '#aaabad';
    if (direction === '' && column.id !== columnId) {
        topColor = '#aaabad';
        bottomColor = '#aaabad';
    } else if (direction === 'ASC' && column.id === columnId) {
        topColor = '#000';
        bottomColor = '#aaabad';
    } else if (direction === 'DESC' && column.id === columnId) {
        bottomColor = '#000';
        topColor = '#aaabad';
    }

    return (
        <svg width='11' height='13' viewBox='0 0 11 13'>
            <g fill='none' fillRule='evenodd' transform='translate(-3 -1.889)'>
                <rect width='17' height='16' />
                <polyline stroke={topColor} strokeLinejoin='round' strokeWidth='2' points='4.25 7 8.5 3 12.75 7' />
                <polyline
                    stroke={bottomColor}
                    strokeLinejoin='round'
                    strokeWidth='2'
                    points='4.25 13 8.5 9 12.75 13'
                    transform='matrix(1 0 0 -1 0 22)'
                />
            </g>
        </svg>
    );
};
