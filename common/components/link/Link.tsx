import * as React from 'react';
import './Link.scss';
import {EventTypes} from "../../interfaces/enums/EventTypes";

interface IProps {
    href?: string;
    target?: string;
    className?: string;
    name?: string;
    event?: any;
}

interface IState {
}

export default class Link extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    onLinkClick() {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnChange, '')
        }
    }

    render() {
        const {href, target, className, name, children} = this.props;

        return (
            <a href={href} target={target} data-name={name} className={`component-link-default ${className}`} onClick={this.onLinkClick.bind(this)}>{children}</a>
        );
    }
}
