import * as React from 'react';
import './InputNumber.scss';
import * as _ from 'lodash';
import {IComponentForm} from '../../interfaces/components/IComponentForm';
import {IComponentProps} from '../../interfaces/components/IComponentProps';
import {EventTypes} from '../../interfaces/enums/EventTypes';
import {CheckStates} from '../../interfaces/enums/CheckStates';
import renderComponentLabel, {ILabelParams} from "../_common/renderComponentLabel";

interface IProps extends IComponentProps {
    value?: number;
    disabled?: boolean;
    required?: boolean;
    float?: boolean;
    label?: ILabelParams;
}

interface IState {
    value: any;
}

export class InputNumber extends React.Component<IProps, IState> implements IComponentForm {
    inputNumberRef: any;

    constructor(props) {
        super(props);

        if (this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }

        this.state = {
            value: this.props.value || (this.props.value === 0 ? 0 : ''),
        };
    }

    getValue() {
        return this.inputNumberRef.value;
    }

    setValue(value) {
        this.setState({
            value: value || this.state.value
        })
    }

    getStatus() {
        return {
            hasValue: !!this.getValue()
        }
    }

    checkState(states: CheckStates[]) {
        let res = true;

        _.forEach(states, state => {
            if (state === CheckStates.CheckRequired) {
                res = res && (!this.props.required || !!this.getValue());
            }
        });

        if (res) {
            $(this.inputNumberRef).removeClass('component-input-number-error');

        } else {
            $(this.inputNumberRef).addClass('component-input-number-error');
        }

        return res;
    }

    onKeyDown(evt) {
        if (((evt.keyCode === 190 ||
                evt.keyCode === 191 ||
                evt.keyCode === 110 ||
                evt.keyCode === 188) ||
                (this.inputNumberRef.value.indexOf('.') > -1 ||
                    this.inputNumberRef.value.indexOf(',') > -1)) && !this.props.float) {
            evt.preventDefault();
        }

        if (((evt.keyCode === 190 ||
                evt.keyCode === 191 ||
                evt.keyCode === 110 ||
                evt.keyCode === 188) &&
                (this.inputNumberRef.value.indexOf('.') > -1 ||
                    this.inputNumberRef.value.indexOf(',') > -1)) && this.props.float) {
            evt.preventDefault();
        }
    }

    onChange(evt) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnChange, evt.target.value)
        }

        this.setState({
            value: evt.target.value
        });
    }

    render() {
        const {className, disabled, label} = this.props;

        return renderComponentLabel(
            <input type={'number'}
                   ref={(r) => this.inputNumberRef = r}
                   className={`component-input-number ${className}`}
                   value={this.state.value}
                   disabled={disabled}
                   onChange={this.onChange.bind(this)}
                   onKeyDown={this.onKeyDown.bind(this)}/>, label
        );

    }
}
