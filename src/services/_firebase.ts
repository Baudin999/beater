import * as firebase from "firebase/app";
// @ts-ignore
import firebaseConfig from "./../../firebase-config.json";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import { log } from "./log";
import { userLoggedIn } from "../redux/actions";

export const initFirebase = () => {
    return new Promise((resolve, reject) => {
        try {
            // init the firebase app
            firebase.initializeApp(firebaseConfig);
            setTimeout(() => {
                resolve();
                // onAuthStateChanged
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        console.log("onAuthStateChanged");
                        console.log(user);
                        userLoggedIn(user);
                    } else {
                        //do sth
                    }
                });
            }, 0);

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
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword($email, $password)
                    .then(r => {
                        resolve(r.user);
                    })
                    .catch(function(error) {
                        reject(log(error));
                    });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    });
};
