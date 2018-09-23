import * as React from 'react';
import * as ReactDOM from "react-dom";

interface IProps {
    selector?: string;
}

interface IState {
}

export default class Portal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {ReactDOM.createPortal(this.props.children, document.querySelector(this.props.selector))}
            </>
        )
    }
}
