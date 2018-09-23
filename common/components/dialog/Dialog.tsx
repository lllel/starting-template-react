import * as React from 'react';
import * as Modal from 'react-modal';
import './Dialog.scss';
import './styles_external/DialogExternal.scss';
import * as _ from 'lodash';

import Button from "../button/Button";

const PerfectScrollbar = require('perfect-scrollbar');

Modal.setAppElement(document.getElementById('body'));

interface IProps {
    title?: string;
    buttons?: IButtonDialog[];
    height?: string;
    width?: string;
    imgTitle?: DialogImageTypes;
    dialogIsOpen?: boolean;
}

interface IState {
    dialogIsOpen: boolean;
}

export default class Dialog extends React.Component<IProps, IState> {
    modalContainer: any;
    buttonsContainer: any;
    imgSource: any;

    constructor(props) {
        super(props);

        this.state = {
            dialogIsOpen: !!this.props.dialogIsOpen
        };

        this.imgSource = {
            "success": require('./content/img/success.png'),
            "error": require('./content/img/error.png'),
            "warning": require('./content/img/warning.png'),
            "question": require('./content/img/question.png')
        }
    }

    static deriveStateFromProps(nextProps, state) {
        if (nextProps.dialogIsOpen != undefined)
            return {dialogIsOpen: nextProps.dialogIsOpen}
    }

    openDialog() {
        this.setState({dialogIsOpen: true});
    }

    closeDialog() {
        this.setState({dialogIsOpen: false});
    }

    afterOpenModal() {
        this.modalContainer.style.height = this.props.height || "auto";
        this.modalContainer.style.width = this.props.width || "auto";
    }

    componentDidMount() {
    }

    render() {
        if (!this.state.dialogIsOpen)
            return null;
        else
            return (
                <Modal appElement={document.querySelector("body")} className="component-dialog"
                       isOpen={this.state.dialogIsOpen}
                       onAfterOpen={this.afterOpenModal.bind(this)}>
                    <div className="component-dialog-overlay"/>
                    <div ref={(r) => this.modalContainer = r}
                         className="component-dialog-container">
                        <div className="component-dialog-header-container">
                            {this.props.imgTitle ? <img src={this.imgSource[this.props.imgTitle]}/> : null}
                            <div className="component-dialog-header">
                                {this.props.title}
                            </div>
                            {
                                this.props.dialogIsOpen == undefined ?
                                    (<Button onClick={this.closeDialog.bind(this)}
                                             disabled={false} visible={true}>
                                        <img src={require('./content/img/close.png')}/>
                                    </Button>)
                                    :
                                    null
                            }
                        </div>
                        <div className="component-dialog-content">
                            {this.props.children}
                        </div>

                        <div className="component-dialog-footer-container">
                            <div className="component-dialog-buttons-container"
                                 ref={(r) => this.buttonsContainer = r}>
                                {this.renderButtons()}
                            </div>
                        </div>
                    </div>

                </Modal>

            )
    }

    renderButtons() {
        return _.map(this.props.buttons, (item, index) => {
            return <Button
                key={index}
                title={item.title}
                className={`${(item.className) ? item.className : ''}`}
                onClick={() => {
                    if (item.closeOnClick) {
                        if (item.callback)
                            item.callback();
                        this.closeDialog();
                    } else {
                        if (item.callback)
                            item.callback();
                    }
                }}
                disabled={false} visible={true}
            />
        })
    }
}

export enum DialogImageTypes {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Question = "question"
}

export interface IButtonDialog {
    title?: string;
    closeOnClick?: boolean;
    callback?: () => void;
    className?: string;
}
