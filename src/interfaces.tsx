export enum SkillTypes {
  Melee = "Melee",
  Ranged = "Ranged",
  Magic = "Magic",
  Defense = "Defense"
}

export enum WeaponTypes {
  Sword = "Sword",
  Dagger = "Dagger",
  Bow = "Bow",
  Crossbow = "Crossbow",
  Source = "Source",
  None = "None",
  Magic = "Magic"
}

export interface ICharacter {
  name: string;
  description: string;
  xp: number;
  hp: number;
  ap: number;
  race: string;
  skills: ICharacterSkill[];
  weapons: ICharacterWeapon[];
}

export interface ICharacterSkill {
  id: string;
  type: SkillTypes;
  weaponType: WeaponTypes;
  name: string;
  description: string;
  level: number;
  notes: string;
}

export interface ICharacterWeapon {
  id: string;
  name: string;
  description: string;
  dmg: string;
  ap: number;
  notes: string;
}

export interface ISkill {
  id: string;
  type: SkillTypes;
  weaponType: WeaponTypes;
  name: string;
  description: string;
}

export interface IWeapon {
  id: string;
  type: WeaponTypes;
  name: string;
  description: string;
  dmg: string;
  ap: number;
}
