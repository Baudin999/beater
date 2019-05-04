import * as React from "react";
import { log } from "./../services/log";
import { login } from "./../services/_firebase";
import { userLoggedIn } from "../redux/actions";

import Form from "react-jsonschema-form";
import { loginSchema, loginUiSchema } from "./../forms/login";

export class Login extends React.Component<any, IState> {
    

    submit = (r) => {
        let {email, password} = r.formData;

        login(email, password)
            .then(user => {
                log(`User ${email} successfully logged in`);
                userLoggedIn(user);
            })
            .catch(error => {
                log(error);
            });
    };

    render() {
        return (
             <div className="login">            
                <Form schema={loginSchema} uiSchema={loginUiSchema} onSubmit={this.submit}/>
            </div>
        );
    }
}

interface IState {
    userName: string;
    password: string;
    message?: string;
}
