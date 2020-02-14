import React from 'react';
import { Resize } from './DataGridResize.styles';

export class DataGridResize extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            startX: null,
            startWidth: null,
            pressed: false,
        };
    }

    handleResizeStart = (event: any) => {
        const { onResizeStart, columnSize } = this.props;
        const id = event.target.id;
        const domRect = event.target.getBoundingClientRect();
        if (onResizeStart) {
            onResizeStart({
                columnId: id,
                width: domRect.width,
                position: domRect.right,
                columnSize,
            });
        }
    };

    render() {
        const { id, resize } = this.props;
        if (!resize) {
            return null;
        }

        return <Resize id={id} onMouseDown={this.handleResizeStart} />;
    }
}

export default DataGridResize;
