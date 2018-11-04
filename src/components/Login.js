import React from "react";

const Login = () => (
  <nav className="login">
    <h2>inventory login</h2>
    <p>Sign in to manage your store's inventory</p>
    <button
      className="github"
      onClick={() => this.props.authenticate("Github")}
    >
      Login With Github
    </button>
    <button
      className="twitter"
      onClick={() => this.props.authenticate("Twitter")}
    >
      Login With Twitter
    </button>
    <button
      className="facebook"
      onClick={() => this.props.authenticate("Facebook")}
    >
      Login With Facebook
    </button>
  </nav>
);

export default Login;
