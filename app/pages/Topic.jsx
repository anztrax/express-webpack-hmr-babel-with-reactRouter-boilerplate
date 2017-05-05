import React from 'react';

export default class Topic extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { match } = this.props;
    return (
      <div>
        <h2>{match.params.topicId}</h2>
      </div>
    )
  }
}