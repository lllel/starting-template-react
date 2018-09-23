import constantsTypes from '../constants-types/constants-type';

const defaultState = {
    loading: false,
    loaded: false,
    data: []
};

export default function (state = defaultState, action){
    const {type, payload, randomId} = action;

    switch (type) {
        case constantsTypes.TEST + constantsTypes.START:
            const stateCopy = JSON.parse(JSON.stringify(state));

            console.log(randomId);

            return stateCopy
    }

    return state;
}
