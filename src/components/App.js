import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    addFish = fish => {
        // retrieve existing state
        const fishes = {...this.state.fishes};
        // set new fish to the fishes variable with a unique key from Date.now
        fishes[`fish${Date.now()}`] = fish; 
        // update the state with the new fishes object
        this.setState({
            fishes
        })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        )
    }
}

export default App