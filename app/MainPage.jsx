import React from 'react';
import {Route, Link } from 'react-router-dom';
import {Home , About, Topics } from './pages';
import App from './components/App';

export default class MainPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>
        <App />

        <hr/>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    )
  }
}