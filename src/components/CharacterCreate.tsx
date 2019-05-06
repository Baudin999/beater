import * as React from "react";

import Form from "react-jsonschema-form";
import { statistics, defaultCharacter } from "./../forms/data";
import { schema, uiSchema, transformErrors } from "./../forms/character-create";
import { Content } from "./snippets/Content";
import { StackPanel } from "./snippets/StackPanel";
import { saveCharacter } from "../redux/actions";

const CharacterCard = ({ character }) => {
  return (
    <div className="card character-card">
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
      </div>
    </div>
  );
};

export class CharacterCreate extends React.Component<any, any> {
  state = {
    character: { name: "", race: "Human", description: "" }
  };
  submit = r => {
    // create a new character
    let newCharacter = { ...defaultCharacter, ...r.formData };
    let race = newCharacter.race;
    let stats = statistics[race];
    newCharacter.statistics = { ...stats };

    console.log(newCharacter);

    // save the new character
    saveCharacter(newCharacter).then(() => {
      this.props.history.push("/characters");
    });
  };

  onChange = r => {
    this.setState({
      ...this.state,
      character: r.formData
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
