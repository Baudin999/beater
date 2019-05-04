import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const $Link = ({ path, text, currentPath = window.location.pathname }) => {
  return (
    <li className={"nav-item" + path === currentPath ? " active" : ""}>
      <Link className="nav-link" to={path}>
        {text}
      </Link>
    </li>
  );
};

export class Nav extends React.Component<INavProps> {
  render() {
    let { email } = this.props;
    let path = window.location.pathname;
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Aria
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <$Link path="/" currentPath={path} text="Status" />
            <$Link path="/characters" currentPath={path} text="Characters" />
            <$Link path="/profile" currentPath={path} text="Profile" />
          </ul>
          <span className="navbar-text">{email}</span>
        </div>
      </nav>
    );
  }
}

interface INavProps {
  email: string;
}
