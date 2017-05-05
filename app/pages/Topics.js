import React from 'react';
import { Link, Route } from 'react-router-dom';
import Topic from './Topic';

export default class Topics extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { match } = this.props;
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Render With React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props vs State</Link>
          </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact path={match.url} render={() => (
          <h3>Please select a topic.</h3>
        )} />
      </div>
    )
  }
}