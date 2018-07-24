import * as React from "react";
import "./App.scss";
import NamePage from "../../../name/pages/name-page/NamePage";

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
                <NamePage/>
            </>
        );
    }
}


