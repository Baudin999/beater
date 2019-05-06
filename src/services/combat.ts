import { ICharacter, IOpponent, ILog } from "../interfaces";
import { Dice } from "./Dice";

/**
 * The Combat system
 */
export const fight = (character: ICharacter, opponent: IOpponent): ILog => {
  console.log(character, opponent);

  let entries = [];

  let characterHP = character.hp;
  let opponentHP = opponent.hp;
  const characterDice = Dice.parse(character.weapons[0].dmg);
  const opponentDice = Dice.parse(opponent.dmg);

  entries.push(`Combat between ${character.name} and ${opponent.name} started`);

  let turn = true;
  while (characterHP > 0 && opponentHP > 0) {
    if (turn) {
      let roll = characterDice.roll();
      let newHP = opponentHP - roll;
      entries.push(`${character.name} hits ${opponent.name} for ${roll} dmg; new hp ${newHP}`);
      opponentHP = newHP;
    } else {
      let roll = opponentDice.roll();
      let newHP = opponentHP - opponentDice.roll();
      entries.push(`${opponent.name} hits ${character.name} for ${roll} dmg; new hp ${newHP}`);
      opponentHP = newHP;
    }
    turn = !turn;
  }

  if (opponentHP < 0) entries.push(`${opponent.name} died`);
  else entries.push(`${character.name} died`);

  return {
    entries
  };
};
