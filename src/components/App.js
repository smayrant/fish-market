import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    }

    // method to add fish to the state
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

    // method to display the sample set of fish to the screen
    loadSampleFishes = () =>{
        this.setState({
            fishes: sampleFishes
        })
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className='fishes'>
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]}/>)}
                    </ul>
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App