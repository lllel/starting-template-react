import * as React from 'react';
import './InputRadio.scss';
import {IComponentForm} from '../../interfaces/components/IComponentForm';
import {IComponentProps} from '../../interfaces/components/IComponentProps';
import {EventTypes} from '../../interfaces/enums/EventTypes';
import {CheckStates} from "../../interfaces/enums/CheckStates";
import {tools} from "../../core/tools";

interface IProps extends IComponentProps {
    disabled?: boolean
    label?: any
    classNameLabel?: string
    checked?: boolean
}

interface IState {
}

export class InputRadio extends React.Component<IProps, IState> implements IComponentForm {
    private readonly idInputRadio = 'idInputRadio_' + tools.randomStr(5);

    inputRadioRef: any;

    constructor(props) {
        super(props);

        if(this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }
    }

    getValue() {
        return this.inputRadioRef.checked ? this.inputRadioRef.value : undefined;
    }

    setValue(value) {
        if (value === this.props.value) {
            this.inputRadioRef.checked = true;
        }
    }

    checkState(states: CheckStates[]) {
        return null;
    }

    getStatus() {
        return {
            hasValue: !!this.getValue()
        }
    }

    onChange(evt) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnChange, evt.target.checked)
        }
    }

    render() {
        const {label, className, classNameLabel, name, value, disabled, checked} = this.props;

        return (
            <div className={`component-input-radio-container ${className}`}>
                <input type={'radio'}
                       ref={(r) => this.inputRadioRef = r}
                       name={name}
                       value={value}
                       id={this.idInputRadio}
                       defaultChecked={checked}
                       disabled={disabled}
                       onChange={this.onChange.bind(this)}/>

                {label ? <label htmlFor={this.idInputRadio} className={classNameLabel || 'component-input-radio-label'}>{label}</label> : ''}
             </div>
        )
    }
}
