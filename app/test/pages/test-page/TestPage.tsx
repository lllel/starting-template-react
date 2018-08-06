import * as React from "react";

interface IProps {
}

interface IState {
}

export default class TestPage extends React.Component<IProps, IState> {
    testPage: any;

    constructor(props) {
        super(props);

        //#region testPage
        this.testPage = null;
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
