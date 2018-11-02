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
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
