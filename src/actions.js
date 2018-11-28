import api from './utils/api';
import constants from './constants';


export default {
  sales: () => async (dispatch) => {
    const response = await api.get('/sales');
    await dispatch({ type: constants.GET_SALES_SUCCESS, sales: response.data });
  },
  wishlist: () => async (dispatch) => {
    const response = await api.get('/sales');
    await dispatch({ type: constants.GET_WISHLIST_SUCCESS, sales: response.data });
  },
  like: id => dispatch => dispatch({ id, type: constants.LIKE_SALE_SUCCESS }),
  unlike: id => dispatch => dispatch({ id, type: constants.UNLIKE_SALE_SUCCESS }),
};
