import React from 'react';
import Settings from './images/settings';
import { Toggle, ToggleContainer, ToggleWrapper } from './DataGridToggle.styles';

export class DataGridToggle extends React.Component<any, any> {
    element: React.RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);
        this.element = React.createRef();
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {
        if (document.body) {
            document.body.addEventListener('click', this.handleClickDocument);
        }
    }

    componentWillUnmount() {
        if (document.body) {
            document.body.removeEventListener('click', this.handleClickDocument);
        }
    }

    handleClickDocument = (event: MouseEvent) => {
        if (
            !this.element.current ||
            !this.state.visible ||
            (event.target instanceof Node && this.element.current.contains(event.target))
        ) {
            return;
        }

        this.close();
    };

    close = () => {
        this.setState({ visible: false });
    };

    toggle = () => {
        this.setState((prev: any) => {
            return {
                visible: !prev.visible,
            };
        });
    };

    render() {
        const { children } = this.props;
        const { visible } = this.state;
        return (
            <ToggleWrapper ref={this.element}>
                <Toggle ref={this.element} onClick={this.toggle}>
                    <Settings />
                </Toggle>
                {visible && <ToggleContainer>{children}</ToggleContainer>}
            </ToggleWrapper>
        );
    }
}

export default DataGridToggle;
