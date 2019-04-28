import { dispatch } from "./store";

export enum Events {
    USER_LOGGED_IN = "USER_LOGGED_IN"
}

export const userLoggedIn = user => {
    dispatch({
        type: Events.USER_LOGGED_IN,
        payload: user
    });
};
