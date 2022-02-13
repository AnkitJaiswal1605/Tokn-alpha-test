import {
  UPDATE_BALANCE_FAILURE,
  UPDATE_BALANCE_REQUEST,
  UPDATE_BALANCE_SUCCESS,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  DISCONNECT_WALLET_FAILURE,
  DISCONNECT_WALLET_REQUEST,
  DISCONNECT_WALLET_SUCCESS,
} from "./walletActions";

export const walletReducer = (
  state = { loading: false, error: "", address: null, balance: 0 },
  action
) => {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case CONNECT_WALLET_SUCCESS: {
      console.log("payload", action.payload);
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    }
    case CONNECT_WALLET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        address: null,
      };

    case DISCONNECT_WALLET_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case DISCONNECT_WALLET_SUCCESS: {
      return {
        ...state,
        loading: false,
        address: null,
        balance: 0,
      };
    }
    case DISCONNECT_WALLET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case UPDATE_BALANCE_SUCCESS:
      return {
        ...state,
        loding: false,
        balance: action.payload,
      };

    case UPDATE_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        balance: action.payload,
      };

    default:
      return state;
  }
};
