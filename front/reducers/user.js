import produce from 'immer';

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  me: null, // 내 정보
  userInfo: null,
  page: 1,
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

export const ADD_FOLLOWING_REQUEST = 'ADD_FOLLOWING_REQUEST';
export const ADD_FOLLOWING_SUCCESS = 'ADD_FOLLOWING_SUCCESS';
export const ADD_FOLLOWING_FAILURE = 'ADD_FOLLOWING_FAILURE';

export const REMOVE_FOLLOWING_REQUEST = 'REMOVE_FOLLOWING_REQUEST';
export const REMOVE_FOLLOWING_SUCCESS = 'REMOVE_FOLLOWING_SUCCESS';
export const REMOVE_FOLLOWING_FAILURE = 'REMOVE_FOLLOWING_FAILURE';

export const UPDATE_LASTSTART_REQUEST = 'UPDATE_LASTSTART_REQUEST';
export const UPDATE_LASTSTART_SUCCESS = 'UPDATE_LASTSTART_SUCCESS';
export const UPDATE_LASTSTART_FAILURE = 'UPDATE_LASTSTART_FAILURE';

export const LEVEL_UP_REQUEST = 'LEVEL_UP_REQUEST';
export const LEVEL_UP_SUCCESS = 'LEVEL_UP_SUCCESS';
export const LEVEL_UP_FAILURE = 'LEVEL_UP_FAILURE';

export const EDIT_GREETINGS_REQUEST = 'EDIT_GREETINGS_REQUEST';
export const EDIT_GREETINGS_SUCCESS = 'EDIT_GREETINGS_SUCCESS';
export const EDIT_GREETINGS_FAILURE = 'EDIT_GREETINGS_FAILURE';

export const GET_EXP = 'GET_EXP';
export const GET_STARS = 'GET_STARS';
export const USE_STARS = 'USE_STARS';

export const SET_PAGE = 'SET_PAGE';

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
        action.me ? draft.me = action.data : draft.userInfo = action.data;
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
      case GET_EXP: {
        draft.me.exp += 1;
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
      case REMOVE_FOLLOWING_REQUEST: {
        break;
      }
      case REMOVE_FOLLOWING_SUCCESS: {
        const followingIndex = draft.me.Followings.findIndex(v=>v.id===action.data);
        draft.me.Followings.splice(followingIndex, 1);
        break;
      }
      case REMOVE_FOLLOWING_FAILURE: {
        break;
      }
      case ADD_FOLLOWING_REQUEST: {
        break;
      }
      case ADD_FOLLOWING_SUCCESS: {
        draft.me.Followings.push(action.data);
        break;
      }
      case ADD_FOLLOWING_FAILURE: {
        break;
      }
      case LEVEL_UP_REQUEST: {
        break;
      }
      case LEVEL_UP_SUCCESS: {
        draft.me.level = action.data;
        break;
      }
      case LEVEL_UP_FAILURE: {
        break;
      }
      case EDIT_GREETINGS_REQUEST: {
        break;
      }
      case EDIT_GREETINGS_SUCCESS: {
        draft.me.greetings = action.data;
        break;
      }
      case EDIT_GREETINGS_FAILURE: {
        break;
      }
      case SET_PAGE:{
        draft.page = action.data;
        break;
      }
      default: {
        break;
      }
    }
  })
};

export default reducer;
