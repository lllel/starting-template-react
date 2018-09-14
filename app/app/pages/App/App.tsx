import * as React from "react";
import "./App.scss";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {mapToArr} from "../../../../common/helpers/helpers";
import {loadShoppingBagItems, mapOrderPricePlus} from "../../../../common/redux/action-create/actionCreate";
import TestPage from "../../../test/pages/test-page/TestPage";

interface IProps {
    shoppingBagItems: any;
    loading: any;
}

interface IState {
    // currentPage: string
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
        console.log(this.props.shoppingBagItems);

        if (this.props.loading) {
            return (
                <p>Loading...</p>
            )}

        return (
            <Router>
                {/*<TestPage/>*/}

                {/*{this.state.currentPage === 'clothesAndAccessories' ? <TestPage onEvent={this.onEvent.bind(this)}/> : null}*/}

                <Switch>
                    <Route path={'/test-page'} component={TestPage} exact={true}/>
                    <Route path={'*'} render={this.showNotFound.bind(this)}/>
                </Switch>
            </Router>
        );
    }
}

// function mapOrderPriceFromStore(store) {
//     return {
//       price: store.orderPrice,
//       t: 'aaaaaaaaaaaa'
//     };
// }

export default connect((store: any) => {
    return {
        shoppingBagItems: mapToArr(store.shoppingBagItems.entities),
        loading: store.shoppingBagItems.loading,
        loaded: store.shoppingBagItems.loaded
    };
}, {mapOrderPricePlus, loadShoppingBagItems})(App);
