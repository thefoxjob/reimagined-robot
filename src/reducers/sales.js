import store from 'store';
import update from 'immutability-helper';

import constants from '../constants';


const initial = {
  collections: {},
  wishlist: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case constants.GET_SALES_SUCCESS: {
      const sales = {};

      action.sales.forEach((sale) => {
        if (state.wishlist.indexOf(sale.id) >= 0) {
          sale.liked = true;
        }

        sales[sale.id] = sale;
      });

      return update(state, { collections: { $merge: sales } });
    }
    case constants.GET_WISHLIST_SUCCESS: {
      const sales = {};

      if (action.sales) {
        action.sales.forEach((sale) => {
          if ( ! state.collections[sale.id]) {
            if (state.wishlist.indexOf(sale.id) >= 0) {
              sale.liked = true;
            }

            sales[sale.id] = sale;
          }
        });
      }

      return update(state, { collections: { $merge: sales } });
    }
    case constants.UNLIKE_SALE_SUCCESS: {
      const queries = { collections: { [action.id]: { liked: { $set: false } } } };
      const index = state.wishlist.indexOf(action.id);

      if (index >= 0) {
        const wishlist = state.wishlist;

        wishlist.splice(index, 1);
        store.set('wishlist', wishlist);
        queries.wishlist = { $splice: [[index, 1]] };
      }

      return update(state, queries);
    }
    case constants.LIKE_SALE_SUCCESS: {
      const queries = { collections: { [action.id]: { liked: { $set: true } } } };
      const index = state.wishlist.indexOf(action.id);


      if (index < 0) {
        const wishlist = state.wishlist;

        wishlist.push(action.id);
        store.set('wishlist', wishlist);
        queries.wishlist = { $push: [action.id] };
      }

      return update(state, queries);

    }
    default:
      const wishlist = store.get('wishlist');
      state.wishlist = Array.isArray(wishlist) ? wishlist : [];

      return state;
  }
};
