import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "../reducers/authReducer";
import { profileAPI, signinAPI, signupAPI } from '../../api/authApi';
import { authActions } from "../actions/authActions";

export const AuthContext = createContext(initialState);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('must be in a AuthProvider');
    return context;
}

export const AuthProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(authReducer, initialState);

    const signup = async ({ email, password }) => {
        dispatch({ type: authActions.AUTH_SIGNUP });
        try {
            const res = await signupAPI({ email, password });
            const { token } = res.data;

            if(token) {
                localStorage.setItem('token', token);
    
                const resUser = await profileAPI(token);
                localStorage.setItem('user', JSON.stringify(resUser.data));
    
                dispatch({ 
                    type: authActions.AUTH_SIGNUP_SUCCESS,
                    payload: {
                        token,
                        user: resUser.data
                    }
                });
                return resUser.data;
            }

        } catch (error) {
            if(error.response.data) {
                dispatch({ 
                    type: authActions.AUTH_SIGNUP_ERROR, 
                    payload: error.response.data.message 
                });
            }
        }
    }

    const signin = async ({ email, password }) => {
        dispatch({ type: authActions.AUTH_SIGNIN });
        try {
            const res = await signinAPI({ email, password });
            const { token } = res.data;

            if(token) {
                localStorage.setItem('token', token);
    
                const resUser = await profileAPI(token);
                localStorage.setItem('user', JSON.stringify(resUser.data));
    
                dispatch({ 
                    type: authActions.AUTH_SIGNIN_SUCCESS,
                    payload: {
                        token,
                        user: resUser.data
                    }
                });
                return resUser.data;
            }

        } catch (error) {
            if(error.response.data) {
                dispatch({ 
                    type: authActions.AUTH_SIGNIN_ERROR, 
                    payload: error.response.data.message 
                });
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        dispatch({ type: authActions.AUTH_LOGOUT });
    }

    return <AuthContext.Provider value={{ 
        ...state,
        signup,
        signin,
        logout
    }}>
        { children }
    </AuthContext.Provider>
}