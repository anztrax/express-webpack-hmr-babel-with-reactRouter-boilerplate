import React, { PropTypes } from 'react';
import uuidV1 from 'uuid/v1';

export default class MonacoDiffEditor extends React.Component{
  static get propTypes(){
    return {
      style : PropTypes.object,
      originalValue : PropTypes.string,
      modifiedValue : PropTypes.string,
      language : PropTypes.string,
      renderSideBySide : PropTypes.bool,
      theme : PropTypes.string
    }
  }

  constructor(props){
    super(props);

    this.state = {
      originalValue : props.originalValue || '',
      modifiedValue : props.modifiedValue || ''
    };

    this.editorId = uuidV1();
    this.initMonaco = this.initMonaco.bind(this);
    this.destroyMonaco = this.destroyMonaco.bind(this);
  }

  initMonaco(){
    const { language, renderSideBySide = true , theme = 'vs' } = this.props;
    const { originalValue, modifiedValue } = this.state;
    window.require.config({ paths: { 'vs': '/show/vs' }});
    window.require(['vs/editor/editor.main'], () => {
      if(typeof monaco != "undefined") {
        const originalModel = monaco.editor.createModel(originalValue, language);
        const modifiedModel = monaco.editor.createModel(modifiedValue, language);

        this.diffEditor = monaco.editor.createDiffEditor(document.getElementById(`${this.editorId}`),{
          theme : theme,
          enableSplitViewResizing: false,
          renderSideBySide: renderSideBySide
        });
        this.diffEditor.setModel({
          original: originalModel,
          modified: modifiedModel
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
    if(typeof this.diffEditor!="undefined")
      this.diffEditor.destroy();
  }

  render(){
    const { style = {} } = this.props;
    return (
      <div id={this.editorId} style={style}></div>
    )
  }
}
