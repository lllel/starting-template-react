import * as React from "react";
import "./App.scss";
// import {ConnectedRouter} from 'react-router-redux';
import {Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {testAC, loadDataAC} from "../../../../common/redux/action/action";
import TestPage from "../../../test/pages/test-page/TestPage";

interface IProps {
    shoppingBagItems: any;
    loading: any;
}

interface IState {
}

class App extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    showNotFound() {
        return <h2>Not Found!</h2>
    }

    onEvent(name) {
        // if (this.props.event) {
        //     this.props.event(name);
        // }
        //
        // this.setState({
        //     currentPage: name
        // });
    }

    render() {
        if (this.props.loading) {
            return (
                <p>Loading...</p>
            )}

        return (
            <>
                {/*{this.state.currentPage === 'clothesAndAccessories' ? <TestPage onEvent={this.onEvent.bind(this)}/> : null}*/}

                <Switch>
                    <Route path={'/test-page'} component={TestPage} exact={true}/>
                    <Route path={'*'} render={this.showNotFound.bind(this)}/>
                </Switch>
            </>
        );
    }
}

export default connect((store: any) => {
    return {
        loading: store.test.loading,
    };
}, {testAC, loadDataAC})(App);
