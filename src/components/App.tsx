import * as React from "react";
import { connect } from "react-redux";
import { Login } from "./Login";

const mapStateToProps = s => s;

class $App extends React.Component<any> {
    render() {
        const { user } = this.props;
        if (user) {
            return <div>This is the app</div>;
        } else {
            return <Login />;
        }
    }
}

export const App = connect(mapStateToProps)($App);
