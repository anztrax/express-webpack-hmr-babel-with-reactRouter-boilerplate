import React from 'react';
import { SimpleMonacoEditor, MonacoDiffEditor } from './External/MonacoEditor';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.style = {
      simpleManoEditorStyle : {
        width : '800px',
        height: '100px',
        border : '1px solid black'
      }
    }
  }

  render(){
    return (
      <div>
        <h1>Testing App </h1>
        <SimpleMonacoEditor style={this.style.simpleManoEditorStyle} language="javascript" />
        <SimpleMonacoEditor style={this.style.simpleManoEditorStyle} language="css" />
        <SimpleMonacoEditor style={this.style.simpleManoEditorStyle} language="html" />

        <MonacoDiffEditor
          style={this.style.simpleManoEditorStyle}
          originalValue="hello there"
          modifiedValue="heh hehfdasf \ntesting gan"
          language="text/plain"
        />
      </div>
    )
  }
}