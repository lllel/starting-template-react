import constantsTypes from '../constants-types/constants-type';
// import {goodsInShoppingBag} from '../../../app/app/data/data';
import {arrToMap} from '../../helpers/helpers';

const goodsInShoppingBag = []; // Временно

const {Record, OrderedMap} = require('immutable');

const RecordState = Record({
    id: '',
    code: '',
    color: '',
    count: '',
    description: '',
    img: '',
    price: '',
    size_: ''
});

const RecordDefaultState = Record({
   loading: false,
   loaded: false,
   entities: new OrderedMap({})
});

const defaultState = new RecordDefaultState();

export default function (state = defaultState, action){
    const {type, payload, randomId, shoppingBagData} = action;

    switch (type) {
        case constantsTypes.shoppingBagPlus:
            return state.updateIn(['entities', payload.id], (item) => {
                console.log(randomId);

                if (item.get('id') === payload.id) {
                    return item
                        .set('price', (parseInt(item.get('price'), 10) + parseInt(goodsInShoppingBag.find((item => item.id === payload.id)).price)))
                        .set('count', parseInt(item.get('count'), 10) + 1 + '');
                }
            });

        case constantsTypes.shoppingBagDelete:
            return state.deleteIn(['entities', payload.id]);

        case constantsTypes.loadShoppingBagItems + constantsTypes.start:
            return state.set('loading', true);

        case constantsTypes.loadShoppingBagItems + constantsTypes.success:
            return state
                .set('entities', arrToMap(shoppingBagData, RecordState))
                .set('loading', false)
                .set('loaded', true);
    }

    return state;
}
