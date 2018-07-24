import * as React from 'react';
import './InputText.scss';
import * as _ from 'lodash';
import {IComponentForm} from '../../interfaces/components/IComponentForm';
import {IComponentProps} from '../../interfaces/components/IComponentProps';
import {EventTypes} from '../../interfaces/enums/EventTypes';
import {CheckStates} from '../../interfaces/enums/CheckStates';
import renderComponentLabel, {ILabelParams} from "../_common/renderComponentLabel";

interface IProps extends IComponentProps {
    required?: boolean;
    disabled?: boolean;
    label?: ILabelParams;
    buttons?: any[];
}

interface IState {
    value: any;
}

export class InputText extends React.Component<IProps, IState> implements IComponentForm {
    inputTextRef: any;
    inputTextImages: any;

    constructor(props) {
        super(props);

        if (this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }

        this.state = {
            value: this.props.value || ''
        };

        this.inputTextImages = {
            x: 'component-input-text-button-clear',
            newWindow: 'component-input-text-button-new-window'
        };
    }

    focus() {
        this.inputTextRef.focus();
    }

    getValue() {
        return this.state.value;
    }

    setValue(value) {
        value === '' ? this.setState({value: ''}) : this.setState({ value: value || this.state.value});
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
            $(this.inputTextRef).removeClass('component-input-text-error');

        } else {
            $(this.inputTextRef).addClass('component-input-text-error');
        }

        return res;
    }

    onChange(evt) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnChange, evt.target.value)
        }

        this.setState({
            value: evt.target.value
        })
    }

    onKeyDown(evt) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnKeyDown, evt.keyCode)
        }
    }

    onClickButton(item) {
        if (item.onClick) {
            item.onClick();

        } else {
            if(item.title.toLowerCase() === 'x')
                this.setValue('');
        }
    }

    render() {
        return (
            <>
                {renderComponentLabel(this.renderInput(), this.props.label)}
            </>
        )
    }

    renderInput() {
        return (
            <div className='component-input-text-container'>
                <input type={'text'}
                   ref={(r) => this.inputTextRef = r}
                   className={`component-input-text ${this.props.className || ''}`}
                   value={this.state.value}
                   disabled={this.props.disabled}
                   onChange={this.onChange.bind(this)}
                   onKeyDown={this.onKeyDown.bind(this)}/>
                {this.renderButtons()}
            </div>
        );
    }

    renderButtons() {
        if (this.props.buttons) {
            return _.map(this.props.buttons, (item, index) => {
                return (
                    <div className='component-input-text-buttons-container' key={index}>
                        <a className={this.inputTextImages[item.title] ? this.inputTextImages[item.title] : 'component-input-text-button-any'}
                           onClick={this.onClickButton.bind(this, item)}>
                            {this.inputTextImages[item.title] ? '' : item.title}
                        </a>
                    </div>
                )
            })
        }
    }
}
