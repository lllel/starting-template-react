import constantsTypes from '../constants-types/constants-type';

export function testAC(id) {
    return {
        type: constantsTypes.TEST,
        payload: {
            id: id
        },
        randomId: true
    };
}

export function loadDataAC() {
    return (dispatch) => {
        dispatch({
            type: constantsTypes.TEST + constantsTypes.START,
            shoppingBagData: true
        });

        setTimeout(() => {
            return dispatch({
                type: constantsTypes.TEST + constantsTypes.SUCCESS,
                shoppingBagData: []
            });
        }, 2000);

        // history.push('/test-page');
    }
}
