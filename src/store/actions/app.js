import { UPDATE_PRODUCTS } from "./types";

export const updateProductList = () => (dispatch) => {
    dispatch({
        type: UPDATE_PRODUCTS,
    });
};