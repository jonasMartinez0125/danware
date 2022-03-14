import { createContext, useContext, useEffect, useReducer } from 'react';
import { productsReducer, initialState } from '../reducers/productsReducer';
import { getProducts, saveProduct } from '../../api/productsApi';
import { productsActions } from '../actions/productsActions';

export const ProductsContext = createContext(initialState);

export const useProducts = () => {
    const context = useContext(ProductsContext);
    return context;
}

export const ProductsProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(productsReducer, initialState);

    const loadProducts = async() => {
       dispatch({ type: productsActions.LOAD_PRODUCTS });

       try {
           const res =  await getProducts();
           if(res.data) {
               dispatch({ type: productsActions.LOAD_PRODUCTS_SUCCESS, payload: res.data });
           }
       } catch (error) {
           console.log(error);
           dispatch({ type: productsActions.LOAD_PRODUCTS_ERROR, payload: error.message });
       }


    };

    useEffect(() => {
      loadProducts();
    }, []);

    const addNewProduct = async (newProduct) => {
        dispatch({ type: productsActions.LOAD_SAVE_PRODUCT })

        try {
            const res = await saveProduct(newProduct);

            if(res.data) {
                dispatch({
                    type: productsActions.LOAD_SAVE_PRODUCT_SUCCESS,
                    payload: res.data
                });
            }
        } catch (error) {
           console.log(error);
           dispatch({ type: productsActions.LOAD_PRODUCTS_ERROR, payload: error.message }) 
        }
    }

    return (<ProductsContext.Provider value={{
        ...state,
        getProducts,
        addNewProduct
    }}>
        { children }
    </ProductsContext.Provider>)
}