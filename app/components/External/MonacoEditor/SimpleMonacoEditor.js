import React, { PropTypes } from 'react';
import uuidV1 from 'uuid/v1';

export default class SimpleMonacoEditor extends React.Component{
  static get propTypes(){
    return {
      style : PropTypes.object,
      value : PropTypes.string,
      language : PropTypes.string.isRequired
    }
  }
  constructor(props){
    super(props);
    this.state = {
      currentValue : props.value || '',
    };

    this.editorId = uuidV1();
    this.initMonaco = this.initMonaco.bind(this);
    this.destroyMonaco = this.destroyMonaco.bind(this);
  }

  initMonaco(){
    const { language } = this.props;
    window.require.config({ paths: { 'vs': '/show/vs' }});
    window.require(['vs/editor/editor.main'], () => {
      if(typeof monaco != "undefined") {
        this.editor = monaco.editor.create(document.getElementById(`${this.editorId}`), {
          value: this.state.currentValue,
          language: language
        });
        this.editor.onDidChangeModelContent((e)=> {
          this.setState({page_edited: true, currentValue: event.target.value})
        });
      }
    });
  }

  componentDidMount() {
    this.initMonaco();
  }

  componentWillUnmount(){
    this.destroyMonaco();
  }

  destroyMonaco(){
    if(typeof this.editor!="undefined")
      this.editor.destroy();
  }

  render(){
    const { style = {} } = this.props;
    return (
      <div id={this.editorId} style={style}></div>
    )
  }
}