### Demo

```jsx harmony
const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

class DataGridExample extends React.Component {
    constructor(props) {
        super(props);

        const columns = keys.map(key => ({
            id: key,
            name: key === 'c' ? <div style={{ display: 'flex' }}><div>test</div><img src="" alt=""/></div> : key.toUpperCase(),
            size: 100,
            alignCell: key === 'a' ? 'center' : 'left',
            alignColumn: key === 'b' ? 'center' : 'left',
            fixed: key !=='c',
            hidden: key ==='d',
            type: key === 'e' ? 'input' : 'select',
            title: key === 'b' ? 'Тестовый тайтл' : '',
        }));

        this.rows = Array.from(Array(50).keys()).map(index => ({
            id: index.toString(),
            ...keys.reduce((cells, key) =>
                Object.assign(cells, { [key]: `${key.toUpperCase()} ${index}`, children: [<div style={{ padding: '10px 10px 10px 108px' }}>Test</div>]}), {}),
        }));

        this.handlerFilter = this.handlerFilter.bind(this);
        this.handlerConfigurable = this.handlerConfigurable.bind(this);
        this.handlerChecked = this.handlerChecked.bind(this);
        this.state = {
            sort: {
                columnId: 'a',
                direction: 'DESC',
            },
            checkedRows: [],
            columns: columns,
            rows: this.rows,
            drag: true,
            resize: true,
            checkable: true,
            configurable: true,
            pagination: true,
            sortable: true,
            fixed: true,
            filter: true,
            visibleColumns: true,
        };
    }

    handlerFilter(nameColumn, value){
        const newRowsFilter = this.rows.filter((el) => {
            if (typeof el[nameColumn] === 'object') {
                return new RegExp(`${value}`, 'i').test(el[nameColumn].value.value);
            } else {
                return new RegExp(`${value}`, 'i').test(el[nameColumn]);
            }
        });
        this.setState({ rows: newRowsFilter });
    }

    handlerConfigurable(filter){
        this.setState({ filter });
    }

    handlerChecked(ids){
        this.setState({ checkedRows: ids });
    };

    render() {
        const configrable = this.state.configurable && { filter: this.state.filter, visibleColumns: this.state.visibleColumns };
        return (
            <Groups design='vertical'>
                <Groups>
                    <Checkbox checked={this.state.drag} onChange={e => this.setState({ drag: e.value })}>
                        Drag
                    </Checkbox>
                    <Checkbox checked={this.state.resize} onChange={e => this.setState({ resize: e.value })}>
                        Resize
                    </Checkbox>
                    <Checkbox checked={this.state.checkable} onChange={e => this.setState({ checkable: e.value })}>
                        Checkable
                    </Checkbox>
                    <Checkbox checked={this.state.configurable} onChange={e => this.setState({ configurable: e.value })}>
                        Configurable
                    </Checkbox>
                    <Checkbox checked={this.state.sortable} onChange={e => this.setState({ sortable: e.value })}>
                        Sortable
                    </Checkbox>
                    <Checkbox checked={this.state.fixed} onChange={e => this.setState({ fixed: e.value })}>
                        Fixed
                    </Checkbox>
                </Groups>
                <div style={{ height: '600px', overflow: 'hidden' }}>
                    <DataGrid
                        columns={this.state.columns}
                        rows={this.state.rows}
                        drag={this.state.drag}
                        resize={this.state.resize}
                        checked={this.state.checkable}
                        sort={this.state.sortable}
                        fixed={this.state.fixed}
                        checkedRows={this.state.checkedRows}
                        handlerChecked={this.handlerChecked}
                        configurable={configrable}
                        handlerFilter={this.handlerFilter}
                        handlerConfigurable={this.handlerConfigurable}
                    />
                </div>
            </Groups>
        );
    }
};

<DataGridExample />
```
