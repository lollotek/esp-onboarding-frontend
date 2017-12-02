import React, { Component } from 'react';

class Item extends Component {
  render() {
    return(
      <div>
        {this.props.name}
      </div>
    )
  }
}

export default Item
