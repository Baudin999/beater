import * as React from "react";
import { connect } from "react-redux";
import { selectCharacter } from "../redux/actions";
import { Content } from "./snippets/Content";
import { StackPanel } from "./snippets/StackPanel";
import { Button, SaveButton } from "./snippets/Button";
import { fight } from "../services/combat";
import { IOpponent } from "../interfaces";

const NoCharacterSelected = () => {
  return <h1>No character selected</h1>;
};

class _CharacterDetails extends React.Component<any, any> {
  state: any = {};
  componentDidMount() {
    let characterName = this.props.match.params.name;
    if (!this.props.selectedCharacter || characterName !== this.props.selectedCharacter) {
      selectCharacter(characterName);
    } else {
      this.setState({
        ...this.state,
        character: this.props.selectedCharacter
      });
    }
  }
  componentWillUpdate(props, state) {
    if (!state.character) {
      this.setState({
        ...this.state,
        character: props.selectedCharacter
      });
    }
  }
  changeScript = (e: any) => {
    let newScript = e.target.value;
    this.setState({
      ...this.state,
      character: {
        ...this.state.character,
        script: newScript
      }
    });
  };
  fight = () => {
    let opponent: IOpponent = {
      name: "Rat",
      hp: 25,
      dmg: "1d4 + 2"
    };

    let log = fight(this.state.character, opponent);
    console.log(log);
  };
  render() {
    let { character } = this.state;
    if (!character) return <NoCharacterSelected />;
    return (
      <Content className="fixed">
        <div className="content">
          <StackPanel>
            <div>
              <h1>{character.name}</h1>
              <p>Race: {character.race}</p>
              <p>{character.description}</p>

              <hr />

              <ul>
                <li>Hit Points (HP): {character.hp}</li>
                <li>XP: {character.xp}</li>
                <li>Action Points (AP): {character.ap}</li>
              </ul>

              <hr />

              <div>
                <h2>Skills</h2>
                {character.skills.map(s => (
                  <div key={s.id}>
                    {s.name} - lvl {s.level}
                  </div>
                ))}
              </div>

              <hr />

              <div>
                <h2>Gear</h2>
                {character.weapons.map(s => (
                  <div key={s.id}>
                    {s.name} - dmg {s.dmg}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
              <h2>Script</h2>
              <div style={{ flex: "1 0" }}>
                <textarea
                  style={{ height: "100%", width: "100%" }}
                  value={character.script}
                  onChange={this.changeScript}
                />
              </div>
            </div>
          </StackPanel>
        </div>
        <div className="button-bar">
          <Button title="Try" icon="fas fa-dice-d20" type="primary" onClick={this.fight} />
          <SaveButton />
        </div>
      </Content>
    );
  }
}

export const CharacterDetails = connect(s => s)(_CharacterDetails);
