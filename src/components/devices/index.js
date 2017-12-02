import React, { Component } from 'react';
import Item from './item'

class Devices extends Component {
  render() {
    const items = this.props.items.map(item => (
      <li><Item name={item.name}/></li>
    ))
    return(
      <div>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default Devices
