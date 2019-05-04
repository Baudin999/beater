import * as React from "react";

import Form from "react-jsonschema-form";
import { schema, uiSchema, transformErrors, defaultCharacter } from "./../forms/character-create";
import { Content } from "./snippets/Content";
import { StackPanel } from "./snippets/StackPanel";
import { findSchemaDefinition } from "./../forms/helpers";
import { saveCharacter } from "../redux/actions";

const CharacterCard = ({ character }) => {
  return (
    <div className="card character-card">
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <ul>
          {Object.keys(character.statistics).map(key => (
            <li key={key}>
              {key}: {character.statistics[key]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export class CharacterCreate extends React.Component<any, any> {
  state = {
    character: defaultCharacter
  };
  submit = r => {
    saveCharacter(r.formData);
  };

  onChange = r => {
    let newCharacter = { ...r.formData };
    if (newCharacter.race !== this.state.character.race) {
      let race = newCharacter.race;
      let stats = schema.properties.race.statistics[race];
      newCharacter.statistics = { ...stats };
    }
    if (newCharacter.profession !== this.state.character.profession) {
      newCharacter.specialization = "";
    }
    this.setState({
      ...this.state,
      character: newCharacter
    });
  };

  render() {
    let { character } = this.state;
    return (
      <Content className="fixed character-create">
        <StackPanel>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={character}
            onSubmit={this.submit}
            onChange={this.onChange}
            transformErrors={transformErrors}
          />
          <CharacterCard character={character} />
        </StackPanel>
      </Content>
    );
  }
}
