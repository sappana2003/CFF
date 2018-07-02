/// <reference path="../store/auth/types.d.ts" />
import React from "react";
import { connect } from 'react-redux';
import {checkLoginStatus, logout, handleAuthStateChange} from "../store/auth/actions";
import { withFederated, Authenticator, SignIn, SignUp, ConfirmSignUp } from 'aws-amplify-react';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // getProfile: () => dispatch(getProfile()),
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  logout: () => dispatch(logout()),
  handleAuthStateChange: (state, data) => dispatch(handleAuthStateChange(state, data))
});

function responseGoogle(res) {
  console.log("responseGoogle", res);
}
const Buttons = (props) => (
    <div>
        <button
          className="btn btn-primary"
            onClick={props.googleSignIn}
        >
        <img
        style={{"width": 16}}
        className="mr-4"
        src={"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjU3cHgiIGhlaWdodD0iNThweCIgdmlld0JveD0iMCAwIDU3IDU4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Z29vZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Imdvb2dsZSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOS4wMDQsMzQuNDE0IEwyOS4wMDQsMjMuODEyIEw1NS42OCwyMy44MTIgQzU2LjA4LDI1LjYwOCA1Ni4zOTIsMjcuMjg4IDU2LjM5MiwyOS42NTQgQzU2LjM5Miw0NS45MjggNDUuNDc2LDU3LjQ5OCAyOS4wMzIsNTcuNDk4IEMxMy4zLDU3LjQ5OCAwLjUzMiw0NC43MyAwLjUzMiwyOC45OTggQzAuNTMyLDEzLjI2NiAxMy4zLDAuNDk4IDI5LjAzMiwwLjQ5OCBDMzYuNzI4LDAuNDk4IDQzLjE2OCwzLjMyIDQ4LjA5OCw3LjkzNiBMNDAuMDA0LDE1LjgwMiBDMzcuOTUyLDEzLjg2NCAzNC4zNiwxMS41ODQgMjkuMDMyLDExLjU4NCBDMTkuNTk4LDExLjU4NCAxMS45MDQsMTkuNDIyIDExLjkwNCwyOS4wMjYgQzExLjkwNCwzOC42MyAxOS42LDQ2LjQ2OCAyOS4wMzIsNDYuNDY4IEMzOS45NDgsNDYuNDY4IDQzLjk2NiwzOC45MTYgNDQuNzA2LDM0LjQ0IEwyOS4wMDIsMzQuNDQgTDI5LjAwMiwzNC40MTIgTDI5LjAwNCwzNC40MTQgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="}
        />
        Sign in / Sign up with Google
        </button>
    </div>
)
const federated = {
  google_client_id: '766882331202-ccnggd9cf0h54h9k5nn6ouqhgmeesrju.apps.googleusercontent.com',
  facebook_app_id: '',
  amazon_client_id: ''
};
const Federated = withFederated(Buttons);
interface ILoginProps {
  checkLoginStatus: () => void,
  logout: () => void,
  handleAuthStateChange: (a, b) => void,
  setup: () => void,
  loggedIn: boolean,
  user: IUserCredentials
};
class Login extends React.Component<ILoginProps, {}> {
  componentDidMount() {
    this.props.checkLoginStatus();
  }
  render() {
    if (!this.props.loggedIn) {
      return (<div>
        <h3>
        Chinmaya Forms Framework
        Sign in</h3>
        {/* <Authenticator hideDefault={true} federated={federated} onStateChange={this.props.handleAuthStateChange}>
          <SignIn federated={federated}/>

          
        </Authenticator> */}
        <Federated federated={federated} onStateChange={this.props.handleAuthStateChange} />
      </div>);
    }
    else {
      return (<div>
        Welcome, {this.props.user.name} ({this.props.user.email})
        <div className="float-right"><button className="btn" onClick={() => this.props.logout()}>Logout</button></div>
      </div>);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);