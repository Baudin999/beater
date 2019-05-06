import * as React from "react";
import { Nav } from "./Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Footer } from "./Footer";
import { Characters } from "./Characters";
import { IState } from "../redux/reducer";
import { CharacterCreate } from "./CharacterCreate";
import { CharacterDetails } from "./CharacterDetails";

const Status = () => {
  return <div>Status</div>;
};

class $Home extends React.Component<IState> {
  render() {
    let { user, selectedCharacter } = this.props;
    return (
      <Router>
        <div className="page">
          <Nav email={user.email} selectedCharacter={selectedCharacter} />
          <Route exact path="/" component={Status} />
          <Route exact path="/characters" component={Characters} />
          <Route exact path="/characters/create" component={CharacterCreate} />
          <Route exact path="/character/:name" component={CharacterDetails} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export const Home = connect(s => s)($Home);
