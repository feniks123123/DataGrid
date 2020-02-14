import * as React from 'react';
import { Content, List } from './DataGridSettings.styles';
import { Groups, H3, Checkbox } from '@fcc/rbo-ui';
import { DataGridToggle } from '../DataGridToggle';

export class DataGridSettings extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            checkedFilter: props.configurable.filter,
        };
    }

    checkedFilter = (event: any, payload: any) => {
        const name = payload.name;
        this.setState({ [name]: !this.state.checkedFilter });
        if (this.props.handlerConfigurable) {
            this.props.handlerConfigurable(!this.state.checkedFilter);
        }
        if (this.props.onFilterColumn) {
            this.props.onFilterColumn(!this.state.checkedFilter);
        }
    };

    handleChangeColumn(value: boolean, columnId: string) {
        const { columns } = this.props;
        const newColumns = columns.map((header: any) => {
            if (header.id === columnId) {
                return {
                    ...header,
                    hidden: !value,
                };
            }

            return header;
        });
        if (this.props.onChangeColumn) {
            this.props.onChangeColumn(newColumns);
        }
    }

    renderColumnSetup() {
        const { columns, configurable } = this.props;

        if (configurable.visibleColumns === undefined || !configurable.visibleColumns) {
            return null;
        }

        const list = columns
            .filter((el: any) => el !== null)
            .filter((el: any) => el.id !== 'dropDown' && el.id !== 'checked')
            .map((column: any) => {
                const checked = column && !column.hidden;
                const onChange = (event: any, payload: any) => this.handleChangeColumn(payload.value, column.id);

                return (
                    <Checkbox key={column.id} size='m' checked={checked} onChange={onChange}>
                        {column.name || column.id}
                    </Checkbox>
                );
            });

        return (
            // todo fix inline-style
            <div style={{ textAlign: 'left' }}>
                <H3 bold>Столбцы:</H3>
                <List>
                    <Groups design='vertical' size='xs'>
                        {list}
                    </Groups>
                </List>
            </div>
        );
    }

    renderFilterSetup() {
        const { configurable } = this.props;

        if (configurable.filter === undefined) {
            return null;
        }

        return (
            <div>
                <H3 bold>Фильтр:</H3>
                <Groups design='vertical' size='xs'>
                    <Checkbox size='m' checked={configurable.filter} name='checkedFilter' onChange={this.checkedFilter}>
                        фильтрация по колонке
                    </Checkbox>
                </Groups>
            </div>
        );
    }

    render(): React.ReactNode {
        return (
            <DataGridToggle>
                <Content>
                    {this.renderColumnSetup()}
                    {this.renderFilterSetup()}
                </Content>
            </DataGridToggle>
        );
    }
}

export default DataGridSettings;
