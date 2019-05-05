import * as React from "react";
import { connect } from "react-redux";
import { selectCharacter } from "../redux/actions";
import { Content } from "./snippets/Content";

const NoCharacterSelected = () => {
  return <h1>No character selected</h1>;
};

class _CharacterDetails extends React.Component<any, any> {
  state: any = {};
  componentDidMount() {
    let characterName = this.props.match.params.name;
    if (!this.props.selectedCharacter || characterName !== this.props.selectedCharacter) {
      selectCharacter(characterName);
    }
  }
  render() {
    let { selectedCharacter } = this.props;
    if (!selectedCharacter) return <NoCharacterSelected />;
    return (
      <Content className="fixed">
        <h1>{selectedCharacter.name}</h1>
        <p>Race: {selectedCharacter.race}</p>
        <p>{selectedCharacter.description}</p>

        <hr />

        <ul>
          <li>Hit Points (HP): {selectedCharacter.hp}</li>
          <li>XP: {selectedCharacter.xp}</li>
          <li>Action Points (AP): {selectedCharacter.ap}</li>
        </ul>

        <hr />

        <div>
          <h2>Skills</h2>
          {selectedCharacter.skills.map(s => (
            <div key={s.id}>
              {s.name} - lvl {s.level}
            </div>
          ))}
        </div>

        <hr />

        <div>
          <h2>Gear</h2>
          {selectedCharacter.weapons.map(s => (
            <div key={s.id}>
              {s.name} - dmg {s.dmg}
            </div>
          ))}
        </div>
      </Content>
    );
  }
}

export const CharacterDetails = connect(s => s)(_CharacterDetails);
