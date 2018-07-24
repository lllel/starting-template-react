import * as React from 'react';

interface IProps {
    onFormExecute?: (data) => void;
}

interface IState {
    dialogIsOpen: boolean;
}

export default (OriginalComponent) => class WrapperComponent extends React.Component<IProps, IState> {
    buttons: any[];
    originalComponent: any;

    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: false
        };
    }

    openDialog() {
        this.setState({dialogIsOpen: true});
    }

    closeDialog() {
        this.setState({dialogIsOpen: false});
    }

    render() {
        return (
            <OriginalComponent ref={(r) => this.originalComponent = r} {...this.props} {...this.state} buttons={this.buttons}>
                {this.props.children}
            </OriginalComponent>
        );
    }
}
