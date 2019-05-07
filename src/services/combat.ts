import { ICharacter, IOpponent, ILog } from "../interfaces";
import { Dice } from "./Dice";

/**
 * The Combat system
 */
export const fight = (party: ICharacter[], opponents: IOpponent[]): ILog => {
  let character = party[0];
  let opponent = opponents[0];

  let entries = [];

  let characterHP = character.hp;
  let opponentHP = opponent.hp;
  const characterDice = Dice.parse(character.weapons[0].dmg);
  const opponentDice = Dice.parse(opponent.dmg);

  entries.push(`Combat between ${character.name} and ${opponent.name} started`);

  let d20 = new Dice(1, 20, 0);

  let turn = true;
  while (characterHP > -1 && opponentHP > -1) {
    let attack = d20.roll();
    let defense = d20.roll();

    if (turn) {
      if (attack > defense) {
        let roll = characterDice.roll();
        let newHP = opponentHP - roll;
        entries.push(`${character.name} hits ${opponent.name} for ${roll} dmg; new hp ${newHP}`);
        opponentHP = newHP;
      } else {
        entries.push(`${character.name} missed.`);
      }
    } else {
      if (attack > defense) {
        let roll = opponentDice.roll();
        let newHP = characterHP - roll;
        entries.push(`${opponent.name} hits ${character.name} for ${roll} dmg; new hp ${newHP}`);
        characterHP = newHP;
      } else {
        entries.push(`${opponent.name} missed.`);
      }
    }
    turn = !turn;
  }

  if (opponentHP < 0) {
    entries.push(`${opponent.name} died`);
    entries.push(`${character.name} won`);
  } else {
    entries.push(`${character.name} died`);
    entries.push(`${opponent.name} won`);
  }

  return generateLoot({
    entries: entries,
    victorious: opponentHP < 0,
    money: 0,
    loot: [],
    party,
    opponents
  });
};

export const generateLoot = (log: ILog): ILog => {
  let opponent = log.opponents[0];
  log.money = Dice.parse(opponent.money).roll();
  for (var i = 0; i < opponent.numberOfItems; ++i) {
    // @ts-ignore
    log.loot.push(opponent.items.random());
  }

  log.party.map(character => {
    character.items = (character.items || []).concat(log.loot);
    character.money = character.money + log.money;
  });
  return log;
};
