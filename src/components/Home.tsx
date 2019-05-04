import * as React from "react";
import { log } from "./../services/log";
import { Nav } from "./Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Footer } from "./Footer";
import { Characters } from "./Characters";
import { IState } from "../redux/reducer";

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
          <Route path="/characters" component={Characters} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export const Home = connect(s => s)($Home);
