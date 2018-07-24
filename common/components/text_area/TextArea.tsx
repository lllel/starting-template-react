import * as React from 'react';
import * as _ from 'lodash'

import {IComponentForm} from "../../interfaces/components/IComponentForm";
import {IComponentProps} from "../../interfaces/components/IComponentProps";
import {EventTypes} from "../../interfaces/enums/EventTypes";
import {CheckStates} from "../../interfaces/enums/CheckStates";
import "./TextArea.scss"
import renderComponentLabel, {ILabelParams} from "../_common/renderComponentLabel";

interface IProps extends IComponentProps {
    value?:string;
    readOnly?:boolean;
    label?:ILabelParams;
}

interface IState {
    value:string;
}

export default class TextArea extends React.Component<IProps, IState> implements IComponentForm{
    textAreaRef: any;

    constructor(props) {
        super(props);
        if(this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }
        this.state = {
            value: this.props.value || '',
        }
    }
    focus() {
        this.textAreaRef.focus();
    }
    getValue() {
        return this.state.value;
    }

    setValue(value) {
        this.setState({
            value: value
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
        if (res) {
            if($(this.textAreaRef).hasClass("component-text-area-error"))
                $(this.textAreaRef).removeClass("component-text-area-error")
        } else {
            $(this.textAreaRef).addClass("component-text-area-error")
        }
        return res;
    }
    onChange (args){
        this.setState({
            value: args.target.value
        });
        if(this.props.event)
            this.props.event(this.props.name, EventTypes.OnChange, args.target.value)
    }
    render() {
        return renderComponentLabel(
            <textarea
                    className={`component-text-area ${(this.props.className)? this.props.className : ''}`}
                    ref={(r)=>this.textAreaRef=r}
                    value={this.state.value}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    onChange={this.onChange.bind(this)}
            />, this.props.label
        )
    }
}
