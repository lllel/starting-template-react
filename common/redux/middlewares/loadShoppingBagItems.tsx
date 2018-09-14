// import {goodsInShoppingBag} from '../../../app/app/data/data';
// import constantsTypes from '../constants-types/constants-type';
//
// let goodsInShoppingBagCopy = JSON.parse(JSON.stringify(goodsInShoppingBag));
//
// export  default store => next => action => {
//     const {shoppingBagData, type, rest} = action;
//
//     if (!shoppingBagData) {
//         return next(action);
//     }
//
//     next({
//         type: type + constantsTypes.start,
//         ...rest
//     });
//
//     setTimeout(() => {
//         return next({
//             ...action,
//             shoppingBagData: goodsInShoppingBagCopy,
//             type: type + constantsTypes.success,
//             ...rest
//         });
//     }, 2000);
// }
