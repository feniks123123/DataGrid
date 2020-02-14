import React from 'react';
import {
    DropDownBlock,
    HeaderContainer,
    HeaderCellContent,
    HeaderCell,
    HeaderCellWrapper,
    DropDownContent,
    HeaderCellSpan,
} from './DataGridHeader.styles';
import { BulletCell } from '../DataGridChecked/DataGridChecked.styles';
import { Checkbox } from '@fcc/rbo-ui';
import Pin from './images/pin';
import { DataGridSort } from '../DataGridSort';
import { DataGridResize } from '../DataGridResize';
import { DataGridDrag } from '../DataGridDrag';
import { DataGridHeaderActions } from '../DataGridHeaderActions';
import { Configurable } from '../DataGridActions';
import { EditAction } from '../DataGridActions';
import { CancelAction } from '../DataGridActions';
import { DeleteAction } from '../DataGridActions';

export class DataGridHeader extends React.PureComponent<any, any> {
    static getDerivedStateFromProps(props: any, state: any) {
        return {
            ...state,
            columns: props.columns,
        };
    }

    constructor(props: any) {
        super(props);
        this.state = {
            columns: props.columns,
        };
    }

    handleResizeEnd = () => {
        const { resizing, onResizeEnd } = this.props;
        if (resizing) {
            requestAnimationFrame(() => onResizeEnd());
        }
    };

    render(): React.ReactNode {
        const { columns } = this.state;
        const {
            sort,
            checked,
            onResizeStart,
            onMouseMove,
            resizing,
            expandFileName,
            onDragStart,
            onDragEnd,
            drag,
            dragData,
            resize,
            fixedColumn,
            dontFixedColumn,
            fixed,
            onUpdateColumns,
            checkedAll,
            hasChecked,
            checkAll,
            sortColumn,
            sortStatus,
            configurable,
            handlerConfigurable,
            onChangeColumn,
            onFilterColumn,
            actionEdit,
            actionCancel,
            actionDelete,
            onMouseOver,
            onMouseOut,
            idColumnHover,
            isDropDownContent,
            isConfigurable,
        } = this.props;
        const indeterminate = !checkedAll() && hasChecked();
        return (
            <HeaderContainer
                id='table-header'
                onMouseMove={onMouseMove}
                onMouseUp={this.handleResizeEnd}
                onMouseLeave={this.handleResizeEnd}>
                {checked && (
                    <BulletCell id='checked-col' header style={{ zIndex: 35 }}>
                        <Checkbox checked={checkedAll()} indeterminate={indeterminate} onChange={checkAll} />
                    </BulletCell>
                )}
                {isDropDownContent && (
                    <DropDownBlock id='dropDown'>
                        <DropDownContent />
                    </DropDownBlock>
                )}
                {columns
                    .filter((column: any) => !column.hidden)
                    .map((column: any, index: any) => {
                        return (
                            <HeaderCell
                                key={index}
                                idColumnHover={idColumnHover}
                                sorting={sort}
                                dragging={Boolean(dragData)}
                                id={column.id}
                                pin={column.pin}
                                leftShift={column.shiftLeft}
                                onPointerEnter={onMouseOver}
                                onPointerLeave={onMouseOut}
                                onDoubleClick={expandFileName}
                                >
                                <HeaderCellWrapper alignProps={column.alignColumn}>
                                    <HeaderCellContent>
                                        <HeaderCellSpan
                                            title={column.title || column.name}
                                            alignProps={column.alignColumn}>
                                            {column.name}
                                        </HeaderCellSpan>
                                    </HeaderCellContent>
                                    <DataGridSort
                                        column={column}
                                        sort={sort}
                                        sortColumn={sortColumn}
                                        sortStatus={sortStatus}
                                    />
                                    {column.fixed && fixed && (
                                        <Pin
                                            pin={!column.pin}
                                            id={`${column.id}-fixed`}
                                            onClick={!column.pin ? fixedColumn : dontFixedColumn}
                                            />
                                    )}
                                    {!column.pin && (
                                        <DataGridResize
                                            id={`${column.id}`}
                                            resize={resize}
                                            columnSize={column.size}
                                            onResizeStart={onResizeStart}
                                            />
                                    )}
                                    {!column.pin && (
                                        <DataGridDrag
                                            id={column.id}
                                            resizing={resizing}
                                            dragData={dragData}
                                            columns={columns}
                                            title={column.title || column.name}
                                            drag={drag}
                                            onUpdateColumns={onUpdateColumns}
                                            onDragStart={onDragStart}
                                            onDragEnd={onDragEnd}
                                            />
                                    )}
                                </HeaderCellWrapper>
                            </HeaderCell>
                        );
                    })}
                {isConfigurable(configurable) && (
                    <DataGridHeaderActions>
                        <EditAction {...{ actionEdit }} />
                        <CancelAction {...{ actionDelete, actionCancel }} />
                        <DeleteAction {...{ actionDelete }} />
                        <Configurable
                            {...{
                                configurable,
                                columns,
                                handlerConfigurable,
                                onChangeColumn,
                                onFilterColumn,
                                isConfigurable,
                            }}
                        />
                    </DataGridHeaderActions>
                )}
            </HeaderContainer>
        );
    }
}

export default DataGridHeader;
