import * as React from 'react';
import * as _ from 'lodash'
import {IComponentForm} from "../../interfaces/components/IComponentForm";
import {IComponentProps} from "../../interfaces/components/IComponentProps";

import {CheckStates} from "../../interfaces/enums/CheckStates";


interface IProps extends IComponentProps {

}

interface IState {

}

export default class Hidden extends React.Component<IProps, IState> implements IComponentForm {

    value: any = this.props.value;

    constructor(props) {
        super(props);
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
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

    render() {
        return null;
    }
}
