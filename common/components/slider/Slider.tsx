import * as React from 'react';
import 'jquery-ui/ui/widgets/slider.js';
import {EventTypes} from "../../interfaces/enums/EventTypes";
import {tools} from "../../core/tools";
import {IComponentProps} from "../../interfaces/components/IComponentProps";
import {IComponentForm} from "../../interfaces/components/IComponentForm";
import renderComponentLabel, {ILabelParams} from "../_common/renderComponentLabel";

interface IProps extends IComponentProps {
    event?: any
    name?: string
    minValue?: number
    maxValue?: number
    value?: number
    label?: ILabelParams;
}

interface IState {
}

export default class Slider extends React.Component<IProps, IState> implements IComponentForm {
    private readonly idSlider = 'idSlider_' + tools.randomStr(5);

    slider: any;

    constructor(props) {
        super(props);

        if (this.props.formRef) {
            this.props.formRef.addFormItemsInArr(this);
        }
    }

    getValue() {
        return this.slider.slider('value');
    }

    setValue(value) {
        this.slider.slider({
            value: value
        });
    }

    getStatus() {
        return {
            hasValue: !!this.getValue()
        }
    }

    checkState() {
       return null;
    }

    onChange(event, ui) {
        if (this.props.event) {
            this.props.event(this.props.name, EventTypes.OnChange, ui.value)
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.slider = ($(`#${this.idSlider}`) as any).slider({
                animate: true,
                max: this.props.maxValue || 100,
                min: this.props.minValue || 0,
                step: 1,
                value: this.props.value || 0,
                slide: this.onChange.bind(this)
            }
        );
    }

    render() {
        return renderComponentLabel(
            <div id={this.idSlider}/>, this.props.label
        );
    }
}
