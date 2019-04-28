import * as firebase from "firebase/app";
// @ts-ignore
import firebaseConfig from "./../../firebase-config.json";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import { log } from "./log";

export const initFirebase = () => {
    return new Promise((resolve, reject) => {
        try {
            firebase.initializeApp(firebaseConfig);
            setTimeout(resolve, 0);
        } catch (err) {
            reject(log(err));
        }
    });
};

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        let $email = email || "foo@bar.com";
        let $password = password || "comeon!!";

        log(`Trying to log in for user: ${email}`);

        firebase
            .auth()
            .signInWithEmailAndPassword($email, $password)
            .then(r => {
                resolve(r);
            })
            .catch(function(error) {
                reject(log(error));
            });
    });
};
