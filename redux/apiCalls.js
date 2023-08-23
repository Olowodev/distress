import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, logout, signupFailure, signupStart, signupSuccess, userActions } from './userRedux';
import Toast from 'react-native-toast-message'
import { publicRequest } from '../requestMethods';


const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        visibilityTime: 6000
    })
}

export const login = (user) => async (dispatch) => {
    console.log(user)
    dispatch(loginStart())
  try {
    // API call to login
    console.log('called')
    const response = await publicRequest.post('/auth/login', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    console.log(data)
    dispatch(loginSuccess(data));
        showToast('success', 'Login Successful')
    } catch (error) {
    dispatch(loginFailure(error.response.data));
    console.log(error.response.data)
    showToast('error', 'Login not successful')
}
};



export const signup = (user) => async (dispatch) => {
    console.log(user)
    dispatch(signupStart())
  try {
    // API call to signup
    console.log('called')
    const response = await publicRequest.post('/auth/register', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;

    console.log(data)
    dispatch(signupSuccess(data));
        showToast('success', 'SignUp Successful')
    } catch (error) {
    dispatch(signupFailure(error.toString()));
    console.log(error)
    showToast('error', 'SignUp not successful')
}
};

export const signout = () => async (dispatch) => {
    dispatch(logout())
}

// export const logout = () => async (dispatch) => {
//   try {
//     // API call to logout
//     const response = await axios.post('https://example.com/api/logout', {}, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = response.data;

//     if (data.success) {
//       dispatch(userActions.logoutSuccess());
//     } else {
//     }
//   } catch (error) {
//     dispatch(userActions.logoutFailure(error.toString()));
//   }
// };
