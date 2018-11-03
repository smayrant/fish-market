import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  // once mounted, firebase is loaded and data is synced
  componentDidMount() {
    const { params } = this.props.match;
    // reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    // the store name is stored as the key and the state of the order is stored as value
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // ensures firebase is no longer listening for changes once the component is unmounted
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // method to add fish to the state
  addFish = fish => {
    // retrieve existing state
    const fishes = { ...this.state.fishes };
    // set new fish to the fishes variable with a unique key from Date.now
    fishes[`fish${Date.now()}`] = fish;
    // update the state with the new fishes object
    this.setState({
      fishes
    });
  };

  // method to update the state of any fish the user modifies
  updateFish = (key, updatedFish) => {
    // obtain copy of current state
    const fishes = { ...this.state.fishes };

    // update the state
    fishes[key] = updatedFish;

    // set new state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // obtain copy of state
    const fishes = { ...this.state.fishes };

    // update the state by setting the fish to null (null is utilized to ensure Firebase also removes the fish)
    fishes[key] = null;

    // update state
    this.setState({ fishes });
  };

  // method to display the sample set of fish to the screen
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // retrieve copy of state
    const order = { ...this.state.order };
    // fish is added to order or quantity is updated
    order[key] = order[key] + 1 || 1;
    // update the state
    this.setState({
      order
    });
  };

  removeFromOrder = key => {
    // retrieve copy of state
    const order = { ...this.state.order };
    // remove item from order
    delete order[key];
    // update the state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          updateFish={this.updateFish}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;
