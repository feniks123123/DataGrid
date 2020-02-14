import React from 'react';
import { HeaderGroupsContainer, HeaderGroupsCell } from './DataGridHeaderGroup.styles';
import { DataGridResize } from '../DataGridResize';

export class DataGridHeaderGroups extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            groupColumns: props.groupColumns,
        };
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        const { groupColumns } = nextProps;
        this.setState({ groupColumns });
    }

    handleResizeEnd = () => {
        const { resizing, onResizeEnd } = this.props;
        if (resizing) {
            requestAnimationFrame(() => {
                onResizeEnd();
            });
        }
    };

    render(): React.ReactNode {
        const { groupColumns } = this.state;
        const { resizing, onResizeStart, onMouseMove } = this.props;
        // todo до делать весь функционал
        return (
            <HeaderGroupsContainer
                onMouseMove={onMouseMove}
                onMouseUp={this.handleResizeEnd}
                onMouseLeave={this.handleResizeEnd}>
                {groupColumns.map((el: any, key: any) => {
                    // if(el.id === 'dropDown') {
                    //     return (
                    //         <DropDownBlock key={ key } id={ `${el.id}-${key}` }/>
                    //     )
                    // }
                    return (
                        <HeaderGroupsCell
                            key={key}
                            colSpan={el.size}
                            id={el.idGroup}
                            alignProps={el.alignColumn}
                            content={el.name}>
                            {el.name}
                            <DataGridResize
                                id={`${el.idGroup}-group`}
                                resizing={resizing}
                                onResizeStart={onResizeStart}
                            />
                        </HeaderGroupsCell>
                    );
                })}
            </HeaderGroupsContainer>
        );
    }
}

export default DataGridHeaderGroups;
