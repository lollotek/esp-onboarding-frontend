import React, { Component } from 'react';
import './App.css';
import Devices from './components/devices/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networks: [],
      network: '',
      password: ''
    }
  }

  componentDidMount() {
    setTimeout(this.espPing, 500);
  }

/*
var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])
p.then(response => console.log(response))
p.catch(error => console.log(error))
*/



  espQuery = () => {
    fetch('http://10.10.10.1/scan', {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET'})
      .then(response => response.json().then( ({networks}) => this.setState({networks})))
      .catch(error => {
        console.log(error); 
        setTimeout(this.espPing, 500)}
      )
    
      // fetch('http://10.10.10.1/scan', {
    //   headers: {
    //     Accept: 'application/json',
    //   },
    //   timeout: 3000,
    //   method: 'GET'})
    // .then(response => {
    //   console.log('Scan Complete');
    //   response.json().then( ({networks}) => this.setState({networks}))
    // })
    // .catch(error => {
    //   console.log("Si è verificato un errore!", error)
    //   setTimeout(this.espQuery, 500);
    // })

    // setTimeout(function() {
    //   req.abort(); // reject the fetching process
    // }, 1000);
  }

  espPing = () => {
    var p = Promise.race([
      fetch('http://10.10.10.1/ping', {
        headers: {
          Accept: 'application/json',
        },
        method: 'GET'}),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject('request timeout'), 1000)
      })
    ])
    p.then(this.espQuery)
    p.catch(error => {
      console.log(error); 
      setTimeout(this.espPing, 500)}
    )
  }

  selectNetwork = (event) => {
    this.setState({
      network: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  sendConfig = () => {
    console.log('send ', this.state.network, this.state.password)
    fetch(`http://10.10.10.1/connect?ssid=${this.state.network}&password=${this.state.password}`, {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET'})
    .then(response => {
      console.log('Send Complete');
      response.json().then( ({res}) => console.log(res))
    })
    .catch(error => {
      console.log("Si è verificato un errore!", error)
    })
  }

  render() {
      const networks = this.state.networks.map((item, index) => {
          return <li key={index}><input name='network' onClick={this.selectNetwork} type='radio' value={item.ssid} />{item.ssid + ' ' + item.pass}</li>
        })
      const networkSelect = networks.length > 0 && <div>
        <ul>
          {networks}
        </ul>
        <input type='password' placeholder='password' value={this.state.password} onChange={this.handlePasswordChange}/>
        <input type='button' onClick={this.sendConfig} value="Configura"/>
      </div>

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Esp Onboarding</h1>
        </header>
        <div>
          <h3>I miei Devices</h3>
          <Devices items={[{name: 'asdf'}, {name: 'aaaaa'}, {name: 'bbbbb'}]} />
        </div>
        <input type='button' value='Aggiungi device' />
        <p className="App-intro">
          {networks.length > 0 ? 'Scan complete:': 'Scanning...'}
        </p>
        {networkSelect}
      </div>
    );
  }
}

export default App;
