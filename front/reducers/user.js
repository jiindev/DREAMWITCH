import produce from 'immer';

export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  followingErrorReason: '', //팔로우 실패 사유
  me: null, // 내 정보
  userInfo: null,
  page: 1,
  userRanking: []
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

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const EDIT_PRIVATE_REQUEST = 'EDIT_PRIVATE_REQUEST';
export const EDIT_PRIVATE_SUCCESS = 'EDIT_PRIVATE_SUCCESS';
export const EDIT_PRIVATE_FAILURE = 'EDIT_PRIVATE_FAILURE';

export const LOAD_RANKING_USERS_REQUEST = 'LOAD_RANKING_USERS_REQUEST';
export const LOAD_RANKING_USERS_SUCCESS = 'LOAD_RANKING_USERS_SUCCESS';
export const LOAD_RANKING_USERS_FAILURE = 'LOAD_RANKING_USERS_FAILURE';

export const EDIT_STAR_REQUEST = 'EDIT_STAR_REQUEST';
export const EDIT_STAR_SUCCESS = 'EDIT_STAR_SUCCESS';
export const EDIT_STAR_FAILURE = 'EDIT_STAR_FAILURE';

export const GET_EXP_REQUEST = 'GET_EXP_REQUEST';
export const GET_EXP_SUCCESS = 'GET_EXP_SUCCESS';
export const GET_EXP_FAILURE = 'GET_EXP_FAILURE';

export const SET_PAGE = 'SET_PAGE';
export const LOGIN_ERROR_RESET = 'LOGIN_ERROR_RESET';
export const FOLLOWING_ERROR_RESET = 'FOLLOWING_ERROR_RESET';
export const SIGNUP_ERROR_RESET = 'SIGNUP_ERROR_RESET';

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
        draft.page = 1;
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
        draft.followingErrorReason = '';
        break;
      }
      case ADD_FOLLOWING_SUCCESS: {
        draft.me.Followings.push(action.data);
        break;
      }
      case ADD_FOLLOWING_FAILURE: {
        draft.followingErrorReason = action.error;
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
      case EDIT_NICKNAME_REQUEST: {
        break;
      }
      case EDIT_NICKNAME_SUCCESS: {
        draft.me.nickname = action.data;
        break;
      }
      case EDIT_NICKNAME_FAILURE: {
        break;
      }
      case EDIT_PRIVATE_REQUEST: {
        break;
      }
      case EDIT_PRIVATE_SUCCESS: {
        draft.me.private = action.data;
        break;
      }
      case EDIT_PRIVATE_FAILURE: {
        break;
      }
      case LOAD_RANKING_USERS_REQUEST: {
        break;
      }
      case LOAD_RANKING_USERS_SUCCESS: {
        draft.userRanking = action.data;
        break;
      }
      case LOAD_RANKING_USERS_FAILURE: {
        break;
      }
      case EDIT_STAR_REQUEST: {
        break;
      }
      case EDIT_STAR_SUCCESS: {
        draft.me.star += action.data;
        break;
      }
      case EDIT_STAR_FAILURE: {
        break;
      }
      case GET_EXP_REQUEST: {
        break;
      }
      case GET_EXP_SUCCESS: {
        draft.me.exp += action.data;
        break;
      }
      case GET_EXP_FAILURE: {
        break;
      }
      case SET_PAGE:{
        draft.page = action.data;
        break;
      }
      case LOGIN_ERROR_RESET:{
        draft.logInErrorReason = ''
      }
      case SIGNUP_ERROR_RESET:{
        draft.signUpErrorReason = ''
      }
      case FOLLOWING_ERROR_RESET:{
        draft.followingErrorReason = ''
      }
      default: {
        break;
      }
    }
  })
};

export default reducer;
