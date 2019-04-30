import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const blockSignup = functions
    .region("europe-west1")
    .auth.user()
    .onCreate(user => {
        return admin
            .auth()
            .updateUser(user.uid, { disabled: true })
            .then(userRecord => console.log("Auto blocked user", userRecord.toJSON()))
            .catch(error => console.log("Error auto blocking:", error));
    });
