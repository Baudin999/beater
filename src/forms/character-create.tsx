import Form from "react-jsonschema-form";
import { transformErrors as tfe } from "./helpers";

export const transformErrors = errors => {
  return tfe(schema, errors);
};

export const defaultCharacter = {
  name: "",
  age: 19,
  race: "Human",
  profession: "Warrior",
  statistics: {
    str: 3,
    dex: 3,
    per: 3,
    cha: 3,
    inu: 3
  }
};

export const schema = {
  title: "Create Character",
  type: "object",
  required: ["name", "age", "race", "profession"],
  properties: {
    name: {
      type: "string",
      title: "Name",
      minLength: 3,
      maxLength: 25,
      messages: {
        minLength: "The name of your character should be at least 3 characters long.",
        maxLength: "The name of your character should not be longer than 25 characters."
      }
    },
    age: {
      type: "number",
      title: "Age",
      minimum: 15,
      maximum: 900,
      default: 19,
      messages: {
        minimum: "Your character should be at least 15 years old to start adventuring!",
        maximum: "You really are too old to keep up, enjoy the hearth!"
      }
    },
    race: {
      type: "string",
      enum: ["Human", "Elf", "Dwarf"],
      title: "Race",
      default: "Human",
      statistics: {
        Human: { str: 3, dex: 3, per: 3, cha: 3, inu: 3 },
        Elf: { str: 1, dex: 4, per: 4, cha: 2, inu: 3 },
        Dwarf: { str: 5, dex: 1, per: 1, cha: 1, inu: 1 }
      }
    },
    profession: {
      type: "string",
      enum: ["Warrior", "Priest", "Rogue", "Hunter", "Sorcerer"],
      title: "Profession",
      default: "Warrior",
      description:
        "Your profession will be at the heart of your character!\nSome professions have specializations."
    }
  },
  dependencies: {
    profession: {
      oneOf: [
        {
          properties: {
            profession: {
              enum: ["Warrior"]
            },
            specialization: {
              type: "string",
              enum: ["Barbarian", "Soldier", "Defender"],
              title: "Specialization",
              description: ""
            }
          },
          required: ["specialization"]
        },
        {
          properties: {
            profession: {
              enum: ["Priest"]
            },
            specialization: {
              type: "string",
              enum: ["Dark Priest", "Holy Priest"],
              title: "Specialization"
            }
          },
          required: ["specialization"]
        },
        {
          properties: {
            profession: {
              enum: ["Sorcerer"]
            },
            specialization: {
              type: "string",
              enum: ["Water", "Earth", "Fire", "Air", "Arcane"],
              title: "Specialization",
              description: "A Sorcerer can specialize in a form of magic. "
            }
          },
          required: ["specialization"]
        },
        {
          properties: {
            profession: {
              enum: ["Rogue", "Hunter"]
            }
          }
        }
      ]
    }
  }
};

export const uiSchema = {
  name: {
    classNames: "boo"
  }
};
