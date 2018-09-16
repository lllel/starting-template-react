import constantsTypes from '../constants-types/constants-type';
import history from '../history/history';

export function mapOrderPricePlus(id) {
    return {
        type: constantsTypes.shoppingBagPlus,
        payload: {
            id: id
        },
        randomId: true
    };
}

export function loadShoppingBagItems() {
    return (dispatch) => {
        dispatch({
            type: constantsTypes.loadShoppingBagItems + constantsTypes.start,
            shoppingBagData: true
        });

        setTimeout(() => {
            return dispatch({
                type: constantsTypes.loadShoppingBagItems + constantsTypes.success,
                shoppingBagData: []
            });
        }, 2000);

        // history.push('/test-page');
    }
}
