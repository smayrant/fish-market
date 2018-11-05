import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  // check if a user is logged in and authenticated on page load
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // look up current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // claim store if there's currently no owner
    if (!store.owner) {
      // save store to user
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // set the state of the inventory component to reflect the current user
    this.setState({
      // currently loggin in user
      uid: authData.user.uid,
      // currently loggin in user or owner of store can manage the store
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    // auth provider created based on what the user wants to sign in with
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    // the current uid is set to null once the user logs out
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;

    // check if the user is logged in by seeing whether the state contains a uid
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check if the logged in user is not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store</p>
          {logout}
        </div>
      );
    }
    // render the inventory assuming the previous two  above conditions are met
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
