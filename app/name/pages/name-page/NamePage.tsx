import * as React from "react";

interface IProps {
}

interface IState {
}

export default class NamePage extends React.Component<IProps, IState> {
    namePage: any;

    constructor(props) {
        super(props);

        //#region namePage
        this.namePage = null;
        //#endregion
    }

    render() {
        return (
            <>
                <p>Hello, world!!!</p>
            </>
        );
    }
}
