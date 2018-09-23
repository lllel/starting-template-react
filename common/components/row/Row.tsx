import * as React from 'react';

interface IProps {
    className?: string;
    colMd?: number;
}

interface IState {
}

export default class Row extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`row ${this.props.className ? this.props.className : ""}`}>
                {this.props.children}
            </div>
        );
    }
}
