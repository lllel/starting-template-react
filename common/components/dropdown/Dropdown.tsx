import * as React from 'react';
import * as _ from 'lodash'

import {IComponentForm} from "../../interfaces/components/IComponentForm";
import {IComponentProps} from "../../interfaces/components/IComponentProps";
import {EventTypes} from "../../interfaces/enums/EventTypes";
import {CheckStates} from "../../interfaces/enums/CheckStates";
import './Dropdown.scss';
import renderComponentLabel, {ILabelParams} from "../_common/renderComponentLabel";

interface IProps extends IComponentProps {
    list?: IListDropdown[];
    firstIsEmpty?: boolean;
    label?: ILabelParams;
}

interface IListDropdown {
    label?: string;
    value?: string;
}

interface IState {
    value?: string;
}

export class Dropdown extends React.Component<IProps, IState> implements IComponentForm {
    dropdownRef: any;
    children: any;

    constructor(props) {
        super(props);
        if (this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }
        this.state = {
            value: this.props.value || '',
        }
    }

    getValue() {
        return this.state.value;
    }

    setValue(value) {
        this.setState({
            value: value || '',
        });
    }

    getLabel() {
        let label = '';

        _.forEach(this.children, (item, index) => {
            if (this.state.value == item.value)
                label = item.label;
        });

        return label;
    }

    getStatus() {
        return {
            hasValue: !!this.getValue()
        }
    }

    checkState(states: CheckStates[]) {
        let res = true;

        _.forEach(states, state => {
            if (state == CheckStates.CheckRequired) {
                res = res && (!this.props.required || (this.getValue() !== ''));
            }
        });

        if (res) {
            if ($(this.dropdownRef).hasClass("component-dropdown-error"))
                $(this.dropdownRef).removeClass("component-dropdown-error");

        } else {
            $(this.dropdownRef).addClass("component-dropdown-error");
        }

        return res;
    }

    onChange(evt) {
        this.setState({
            value: evt.target.value,
        });

        if (this.props.event)
            this.props.event(this.props.name, EventTypes.OnChange, evt.target.value);
    }

    render() {
        return renderComponentLabel(
            <select ref={(r) => this.dropdownRef = r}
                    onChange={this.onChange.bind(this)}
                    className={`component-dropdown ${(this.props.className) ? this.props.className : ''}`}
                    value={this.state.value}
                    disabled={this.props.disabled}>
                {this.renderList.call(this)}
            </select>, this.props.label
        );
    }

    renderList() {
        this.children = this.props.children ? this.parseChildren(this.props.children) : this.props.list;

        if (this.props.firstIsEmpty && this.children[0].value != '')

            this.children.unshift({label: '', value: ''});
        return _.map(this.children, (item, index) => {
            return <option key={index} value={item.value}>{item.label}</option>
        })
    }

    parseChildren(children) {
        if (!_.isArray(children)) {
            children = [children];
        }

        let list = [];

        list = _.map(children, (item, index) => {
            return {label: item.props.children, value: item.props.value};
        });

        return list;
    }
}

interface IPropsDropItem {
    value?: string;
}

interface IStateDropItem {
}

export class DropItem extends React.Component<IPropsDropItem, IStateDropItem> {

}
