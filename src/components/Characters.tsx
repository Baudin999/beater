import * as React from "react";
import { connect } from "react-redux";
import { getCharacters } from "../redux/actions";
import { ICharacter } from "../interfaces";
import { AddButton } from "./snippets/AddButton";

const CharacterCard = ({ character }) => {
  return (
    <div className="card" style={{}}>
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's
          content.
        </p>
      </div>
    </div>
  );
};

class _Characters extends React.Component<any> {
  componentDidMount() {
    if (!this.props.characters) {
      getCharacters(this.props.user.uid);
    }
  }
  render() {
    if (!this.props.characters) return null;
    let { characters } = this.props;
    return (
      <div className="content">
        <div className="card-columns">
          {characters.map(c => (
            <CharacterCard key={c.name} character={c} />
          ))}
        </div>
        <AddButton />
      </div>
    );
  }
}

export const Characters = connect((s: any) => ({
  characters: s.characters,
  user: s.user
}))(_Characters);
