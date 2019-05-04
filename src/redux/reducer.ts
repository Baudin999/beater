import { Events } from "./actions";

let defaultState: IState = {};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return {
        ...state,
        user: action.payload
      };
    case "CHARACTERS_GOTTEN":
      return {
        ...state,
        characters: action.payload
      };
    default:
      return state;
  }
};

export interface IState {
  user?: IUser;
}

export interface IUser {
  email: string;
  uid: string;
}
