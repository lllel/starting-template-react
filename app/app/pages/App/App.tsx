import * as React from "react";
import "./App.scss";
import TestPage from "../../../test/pages/test-page/TestPage";

interface IProps {
}

interface IState {
}

export default class App extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <TestPage/>
            </>
        );
    }
}


