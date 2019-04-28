import { Events } from "./actions";

let defaultState = {};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export interface IState {
    user?: IUser;
}

export interface IUser {
    name: string;
}
