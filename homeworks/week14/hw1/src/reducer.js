import { CHANGE_FEATURE_TITLE, LOGIN, LOGOUT, ME, CREATE_POST, READ_POST, DELETE_POST, EDIT_POST } from './actionTypes'

// initial state 可以依據功能拆分 ？
const INIT = {
  featureTitle: 'Greeting!',
  isLoginLoading: null,
  isLogin: null,
  loginErrorMessage: null,
  isLogoutLoading: null,
  username: null,
  article: []
}

// reducer 可以依據功能拆分 ？
function reducer(state = INIT, action) {
  switch(action.type) {
    case CHANGE_FEATURE_TITLE: {
      return {
        ...state, // 這一行一定要加嗎 ？為什麼要加 ？不加會怎麼樣？ 哪裡有答案 ？
        featureTitle: action.featureTitle
      }
    }
    
    //// promise-middleware 的三個階段如果不需要 return 改變 initial state 可以不用寫 ？
    // login
    case `${LOGIN}_PENDING`: {
      return {
        ...state,
        isLoginLoading: true,
        loginErrorMessage: null
      }
    }
    case `${LOGIN}_FULFILLED`: {
      const response = action.payload
      console.log('login response', response)
      if (response.data.result==='success') {
        return {
          ...state,
          isLoginLoading: false,
          isLogin: true
        }
      }   
    }
    case `${LOGIN}_REJECTED`: {
      const response = action.payload
      return {
        ...state,
        isLoginLoading: false,
        loginErrorMessage: response.response.data.message
      }
    }
    // logout
    case `${LOGOUT}_PENDING`: { // 是不是一定要有 pending ？ 什麼時候可以省略三階段的其中一個 ？
      return Object.assign({}, state, {
        isLogoutLoading: true
      })
    }
    case `${LOGOUT}_FULFILLED`: {
      console.log(action.payload)
      return {
        ...state,
        isLogin: null,
        isLogoutLoading: false,
        username: null,
        featureTitle: 'ByeBye!'
      }
    }
    // checklogin
    case `${ME}_FULFILLED`: {
      const response = action.payload
      if (response.data.message==='success') {
        return {
          ...state,
          isLogin: true,
          username: response.data.result.username
        }
      }
    }
    case `${ME}_REJECTED`: {
      const response = action.payload
      if (response.response.data.result==='failure') {
        return {
          ...state,
          loginErrorMessage: response.response.data.message
        }
      }
    }
    // createPost
    // readPost
    case `${READ_POST}_FULFILLED`: {
      const response = action.payload
      return {
        ...state,
        article: response.data
      }
    }
    // deletePost

    default:
      return state
  }
}

export default reducer