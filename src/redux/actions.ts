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
        .once("value")
        .then(snapshot => {
            try {
            let value = snapshot.val();
            console.log(value);
            }
            catch(err) {
                console.log(err)
            }
        });

};
