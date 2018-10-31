import React, { Fragment } from 'react';

class StorePicker extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Please enter a store</h1>
                <input type="text" required placeholder="Store Name" />
                <button>Visit Store</button>
            </Fragment>
        )
    }
}

export default StorePicker