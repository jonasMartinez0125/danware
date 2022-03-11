import { createContext, useEffect, useReducer } from 'react';
import { productsReducer, initialState } from '../reducers/productsReducer';
import { getProducts } from '../../api/productsApi';
import { productsActions } from '../actions/productsActions';

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(productsReducer, initialState);

    const loadProducts = async() => {
       dispatch({ type: productsActions.LOAD_PRODUCTS });

       const res =  await getProducts();
       if(res.data) {
           dispatch({ type: productsActions.LOAD_PRODUCTS_SUCCESS, payload: res.data });
       }

    };

    useEffect(() => {
      loadProducts();
    }, [])

    return (<ProductsContext.Provider value={{
        ...state,
        getProducts
    }}>
        { children }
    </ProductsContext.Provider>)
}