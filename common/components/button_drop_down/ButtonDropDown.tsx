import * as React from 'react';

import "./ButtonDropDown.scss"

import './libs/bootstrap/js/bootstrap.js';
import './libs/bootstrap/css/bootstrap.css';
import './libs/bootstrap/css/bootstrap-theme.css';

import * as _ from "lodash";


interface IProps {
    title?: string;
    disabled?: boolean;
    visible?: boolean;
    className?: string;
}

interface IState {

}

export default class ButtonDropDown extends React.Component<IProps, IState> {
    buttonDropdownRef: any;

    constructor(props) {
        super(props);
    }

    openDropdown() {
        if ($(this.buttonDropdownRef).hasClass("open")) {
            $(this.buttonDropdownRef).removeClass("open")

        } else {
            $(this.buttonDropdownRef).addClass("open")
        }
    }

    onClick(name, callback) {
        callback(name);
    }

    render() {
        return (
            <div className={`btn-group component-button-dropdown
                        ${(this.props.className) ? this.props.className : ''}`}
                 ref={(r) => this.buttonDropdownRef = r}>
                <button type="button"
                        className={`btn btn-default dropdown-toggle
                        ${(this.props.visible === false) ? "component-button-dropdown-hidden" : ''}`}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        disabled={this.props.disabled}
                        onClick={this.openDropdown.bind(this)}>
                    {this.props.title} <span className="caret"></span>
                </button>
                <ul className="dropdown-menu component-button-dropdown-menu">
                    {this.parseChildren(this.props.children)}
                </ul>
            </div>


        )
    }

    parseChildren(children) {
        if (!_.isArray(children)) {
            children = [children];
        }

        let a = _.map(children, (item, index) => {
            if (item.type.name === "ButtonDrop") {
                return <li key={index}>
                    <a href={item.props.url}
                       target={item.props.target}
                       className={`component-button-dropdown-item
                           ${(item.props.disabled === true) ? "component-button-dropdown-item-hidden" : ''}`}
                       onClick={item.props.onClick ? () => {
                           this.onClick(item.props.name, item.props.onClick)
                       } : null}>{item.props.title}</a>
                </li>
            }

            if (item.type.name === "ButtonDelimiter")
                return <li key={index} role="separator" className="divider"/>
        });

        return a;
    }
}

interface IPropsButtonDrop {
    title?: string;
    disabled?: boolean;
    name?: string;
    onClick?: (name: string) => void;
    target?: string;
    url?: string;
}

interface IStateButtonDrop {
}

export class ButtonDrop extends React.Component<IPropsButtonDrop, IStateButtonDrop> {

}

interface IPropsButtonDelimiter {
}

interface IStateButtonDelimiter {
}

export class ButtonDelimiter extends React.Component<IPropsButtonDelimiter, IStateButtonDelimiter> {
}
