import produce from 'immer';

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  me: null, // 내 정보
  friends: [],
  userInfo: null,
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_FRIENDS_REQUEST = 'LOAD_FRIENDS_REQUEST';
export const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS';
export const LOAD_FRIENDS_FAILURE = 'LOAD_FRIENDS_FAILURE';

export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
export const ADD_FRIEND_FAILURE = 'ADD_FRIEND_FAILURE';

export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';
export const REMOVE_FRIEND_SUCCESS = 'REMOVE_FRIEND_SUCCESS';
export const REMOVE_FRIEND_FAILURE = 'REMOVE_FRIEND_FAILURE';

export const UPDATE_LASTSTART_REQUEST = 'UPDATE_LASTSTART_REQUEST';
export const UPDATE_LASTSTART_SUCCESS = 'UPDATE_LASTSTART_SUCCESS';
export const UPDATE_LASTSTART_FAILURE = 'UPDATE_LASTSTART_FAILURE';

export const GET_STARS = 'GET_STARS';
export const USE_STARS = 'USE_STARS';

const reducer = (state = initialState, action) => {
  return produce(state, (draft)=>{
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoggingIn = true;
        draft.logInErrorReason = '';
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.error;
        draft.me = null;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLoggingOut = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSignedUp = false;
        draft.isSigningUp = true;
        draft.signUpErrorReason = '';
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        draft.me = null;
        break;
      }
      case LOAD_USER_REQUEST: {
        break;
      }
      case LOAD_USER_SUCCESS: {
        console.log('action.me check:',action.me);
        action.me ? draft.me = action.data : draft.userInfo = action.data;
        console.log('draft.me:', draft.me);
        break;
      }
      case LOAD_USER_FAILURE: {
          break;
      }
      case UPDATE_LASTSTART_REQUEST: {
        break;
      }
      case UPDATE_LASTSTART_SUCCESS: {
        draft.me.lastStart = action.data;
        break;
      }
      case UPDATE_LASTSTART_FAILURE: {
        break;
      }
      case GET_STARS: {
        draft.me.star += action.data;
        break;
      }
      case USE_STARS: {
        draft.me.star -= action.data;
        break;
      }
      case LOAD_FRIENDS_REQUEST: {
        break;
      }
      case LOAD_FRIENDS_SUCCESS: {
        draft.friends = action.data;
        break;
      }
      case LOAD_FRIENDS_FAILURE: {
        break;
      }
      case REMOVE_FRIEND_REQUEST: {
        break;
      }
      case REMOVE_FRIEND_SUCCESS: {
        const friendIndex = draft.friends.findIndex(v=>v.id===action.data);
        draft.friends.splice(friendIndex, 1);
        break;
      }
      case REMOVE_FRIEND_FAILURE: {
        break;
      }
      case ADD_FRIEND_REQUEST: {
        break;
      }
      case ADD_FRIEND_SUCCESS: {
        draft.friends.push(action.data);
        break;
      }
      case ADD_FRIEND_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  })
};

export default reducer;
