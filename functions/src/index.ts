import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const blockSignup = functions.auth.user().onCreate((event: any) => {
    return admin
        .auth()
        .updateUser(event.data.uid, { disabled: true })
        .then(userRecord => console.log("Auto blocked user", userRecord.toJSON()))
        .catch(error => console.log("Error auto blocking:", error));
});
