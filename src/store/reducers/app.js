import { UPDATE_PRODUCTS } from "../actions/types";

const initialState = {
    updateProducts: 0
};

export default function (state = initialState, action) {
    const { type } = action;
    switch (type) {
        case UPDATE_PRODUCTS:
            return { ...state, updateProducts: state.updateProducts + 1 };
        default:
            return state;
    }
}