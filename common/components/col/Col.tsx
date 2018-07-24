import * as React from 'react';

interface IProps {
    className?: string;
    md?: number;
    offset?: number;
}

interface IState {
}

export default class Col extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${(this.props.md ? "col-md-" + this.props.md : "")} ${(this.props.offset ? "col-md-offset-" + this.props.offset : "")} ${this.props.className ? this.props.className : ""}`}>
                {this.props.children}
            </div>
        );
    }
}
