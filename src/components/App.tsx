import * as React from "react";
import { connect } from "react-redux";
import { Login } from "./Login";

const mapStateToProps = s => s;

export const App = connect(mapStateToProps)(({ user }) => {
    console.log(user);
    if (user) {
        return <div>This is the app</div>;
    } else {
        return <Login />;
    }
});
