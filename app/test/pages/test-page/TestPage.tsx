import * as React from "react";
import {NavLink, Route} from 'react-router-dom';
import Link from "../../../../common/components/link/Link";

interface IProps {
    // onEvent: (name) => void;
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
            <ul>
                <li>Hello world!!!</li>

                {<Route path={'/path'} render={this.renderLinks.bind(this)}/>}
            </ul>
        );
    }

    renderLinks() {
        return [].map((item, index) => {
            return (
                <li key={index}>
                    {/*<Link event={this.props.onEvent}/>*/}

                    <NavLink to={'/path/' + item.name} activeClassName={'className'}>{item.title}</NavLink>
                </li>
            );
        });
    }
}
