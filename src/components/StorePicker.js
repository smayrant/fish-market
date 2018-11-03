import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  };

  goToStore = e => {
    // prevent the form from submitting
    e.preventDefault();

    // retrieve the text from the input field
    const storeName = this.myInput.value.value;

    // the page is changed to /store/whatever the user entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        {/* a default store name is created using the getFunName function from the helper file  */}
        <input
          type="text"
          required
          placeholder="Store Name"
          ref={this.myInput}
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;
