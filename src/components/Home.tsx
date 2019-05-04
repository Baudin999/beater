import * as React from "react";
import { log } from "./../services/log";
import { Nav } from "./Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Footer } from "./Footer";
import { Characters } from "./Characters";
import { IState } from "../redux/reducer";
import { CharacterCreate } from "./CharacterCreate";

class CharacterDetails extends React.Component<any> {
  render() {
    let characterName = this.props.match.params.name;
    return <div>{characterName}</div>;
  }
}

const Status = () => {
  return <div>Status</div>;
};

class $Home extends React.Component<IState> {
  render() {
    let { user } = this.props;
    return (
      <Router>
        <div className="page">
          <Nav email={user.email} />
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
