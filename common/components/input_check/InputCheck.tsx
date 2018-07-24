import * as React from 'react';
import * as _ from 'lodash'

import {IComponentForm} from "../../interfaces/components/IComponentForm";
import {IComponentProps} from "../../interfaces/components/IComponentProps";
import {EventTypes} from "../../interfaces/enums/EventTypes";
import {CheckStates} from "../../interfaces/enums/CheckStates";
import {tools} from "../../core/tools";

import './InputCheck.scss';

interface IProps extends IComponentProps {
    title?: string;
}

interface IState {
    checked: boolean;
}

export default class InputCheck extends React.Component<IProps, IState> implements IComponentForm {
    readonly idInputCheck = 'idInputCheck' + tools.randomStr(5);
    inputCheckRef: any;

    constructor(props) {
        super(props);
        if (this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }
        this.state = {
            checked: this.props.value || false,
        }
    }

    getValue() {
        return !!this.state.checked;
    }

    setValue(value) {
        this.setState({
            checked: value
        });
    }

    getStatus() {
        return {
            hasValue: !!this.getValue()
        }
    }

    checkState(states: CheckStates[]) {
        var res = true;
        _.forEach(states, state => {
            if (state == CheckStates.CheckRequired) {
                res = res && (!this.props.required || !!this.getValue());
            }
        });
        return res;
    }

    onChange(args) {
        this.setState({
            checked: args.target.checked
        });
        if (this.props.event)
            this.props.event(this.props.name, EventTypes.OnChange, args.target.checked)
    }

    render() {
        return (
            <div className={`${(this.props.className) ? this.props.className : ''} component-check-container`}>

                    <input type="checkbox"
                           ref={(r) => this.inputCheckRef = r}
                           checked={this.state.checked}
                           disabled={this.props.disabled}
                           onChange={this.onChange.bind(this)}
                           id={this.idInputCheck}/>
                    <label className="component-check-label" htmlFor={this.idInputCheck}>
                        {this.props.title}
                    </label>
            </div>

        )
    }
}
