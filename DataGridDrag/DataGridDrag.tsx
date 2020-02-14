import React, { Component } from 'react';
import { Drag } from './DataGridDrag.styles';

export class DataGridDrag extends Component<any, any> {
    dragEnterCounter = 0;
    dragEnterColumnId: string | null | undefined;
    justChangedColumns: boolean | undefined;

    handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        const { resizing, columns, onDragStart } = this.props;
        if (resizing) {
            event.preventDefault();
            return;
        }

        const columnsId = event.currentTarget.dataset.id;
        const column = columns.find((item: any) => item.id === columnsId);

        if (!column || !columnsId) {
            event.preventDefault();
            return;
        }
        // Firefox needs it, IE11 needs a text and some string as argument
        event.dataTransfer.setData('Text', columnsId);
        event.dataTransfer.effectAllowed = 'move';

        onDragStart({ column });
    };

    handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
        const { dragData, columns, onUpdateColumns } = this.props;
        event.preventDefault();
        this.dragEnterCounter++;

        if (!dragData) {
            return;
        }

        const columnId = event.currentTarget.dataset.id;

        if (this.justChangedColumns) {
            this.justChangedColumns = false;
            return;
        }

        if (this.dragEnterColumnId === columnId) {
            return;
        }

        this.dragEnterColumnId = columnId;

        const draggableColumn = dragData.column;

        if (draggableColumn.id === columnId) {
            return;
        }

        let isLeft = true; // Add column to the left or to the right relative to the drag entered column
        const newColumns = columns.reduce((result: any, column: any) => {
            if (column.id === draggableColumn.id) {
                isLeft = false;
                return result;
            }

            if (column.id === columnId && isLeft) {
                result.push(draggableColumn);
            }

            result.push(column);

            if (column.id === columnId && !isLeft) {
                result.push(draggableColumn);
            }

            return result;
        }, []);

        onUpdateColumns(newColumns);

        this.justChangedColumns = true;
    };

    handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
    };

    handleDragLeave = () => {
        this.dragEnterCounter--;

        if (!this.dragEnterCounter) {
            this.dragEnterColumnId = null;
        }
    };

    handleDragEnd = () => {
        this.props.onDragEnd();
    };

    handleDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
    };

    render() {
        const { drag, id, title } = this.props;
        if (!drag) {
            return null;
        }

        return (
            <Drag
                draggable
                title={title}
                data-id={id}
                onDragStart={this.handleDragStart}
                onDragEnter={this.handleDragEnter}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDragEnd={this.handleDragEnd}
                onDrop={this.handleDrop}
                />
        );
    }
}

export default DataGridDrag;
