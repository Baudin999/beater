import * as React from "react";
import { connect } from "react-redux";
import { Login } from "./Login";
import { Home } from "./Home";

const mapStateToProps = s => s;

class $App extends React.Component<any> {
    render() {
        const { user } = this.props;
        if (user) {
            return <Home />;
        } else {
            return <Login />;
        }
    }
}

export const App = connect(mapStateToProps)($App);
