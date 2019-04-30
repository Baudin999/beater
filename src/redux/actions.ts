import { dispatch } from "./store";
import * as firebase from "firebase";

export enum Events {
    USER_LOGGED_IN = "USER_LOGGED_IN"
}

export const userLoggedIn = user => {
    dispatch({
        type: Events.USER_LOGGED_IN,
        payload: user
    });

    firebase
        .database()
        .ref(user.uid)
        // @ts-ignore
        .once(snapshot => {
            let value = snapshot.val();
            console.log(value);
        });

    // fetch(`https://aria-beater.firebaseio.com/${user.uid}.json`)
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response);
    //     });
};
