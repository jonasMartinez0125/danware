import { productsActions } from '../actions/productsActions';

export const initialState = {
    isLoading: false,
    products: [],
    errorMessage: null
};

export const productsReducer = (state, actions) => {

    switch (actions.type) {
        case productsActions.LOAD_PRODUCTS:
            return {
                ...state,
                isLoading: true
            }
        case productsActions.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: actions.payload,
                errorMessage: null
            }
        case productsActions.LOAD_PRODUCTS_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: actions.payload
            }
        case productsActions.LOAD_SAVE_PRODUCT: 
            return {
                ...state,
                isLoading: true
            }
        case productsActions.LOAD_SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: [...state.products, actions.payload ],
                errorMessage: null
            }
        case productsActions.LOAD_SAVE_PRODUCT_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: actions.payload
            }
        default:
            return { ...state };
    }
}