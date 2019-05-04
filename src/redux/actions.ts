import { dispatch, getState } from "./store";
import * as firebase from "firebase";

export enum Events {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  CHARACTERS_GOTTEN = "CHARACTERS_GOTTEN",
  CHARACTER_CREATED = "CHARACTER_CREATED"
}

export const userLoggedIn = user => {
  dispatch({
    type: Events.USER_LOGGED_IN,
    payload: user
  });
};

export const getCharacters = (uid: string) => {
  firebase
    .database()
    .ref(uid)
    .once("value")
    .then(snapshot => {
      try {
        let value = snapshot.val();
        let characters = [];
        for (var key in value.characters) {
          characters.push(value.characters[key]);
        }
        dispatch({
          type: Events.CHARACTERS_GOTTEN,
          payload: characters
        });
      } catch (err) {
        console.log(err);
      }
    });
};

export const saveCharacter = character => {
  let { user } = getState();
  if (!user) throw "Hey! quit hacking and leave this game alone!";
  firebase
    .database()
    .ref(`${user.uid}/characters/${character.name}`)
    .set(character)
    .then(() => {
      dispatch({
        type: Events.CHARACTER_CREATED,
        payload: character
      });
    });
};
