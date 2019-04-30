import * as React from "react";
import { log } from "./../services/log";
import { login } from "./../services/_firebase";
import { userLoggedIn } from "../redux/actions";

export class Login extends React.Component<any, IState> {
    state: IState = {
        userName: "",
        password: "",
        message: ""
    };

    changeUserName = event => {
        this.setState({
            ...this.state,
            userName: event.target.value
        });
    };

    changePassword = event => {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    };

    submit = () => {
        let { userName, password } = this.state;
        if (!userName || !password) return;
        login(userName, password)
            .then(user => {
                log(`User ${userName} successfully logged in`);
                userLoggedIn(user);
            })
            .catch(error => {
                log(error);
            });
    };

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <form>
                    <div>
                        <label>Email:</label>
                        <input value={this.state.userName} onChange={this.changeUserName} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.changePassword}
                        />
                    </div>
                    <button type="button" onClick={this.submit}>
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

interface IState {
    userName: string;
    password: string;
    message?: string;
}
