// @flow

import './styles/styles.less';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { Component } from 'react';
import type { Element } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
// import FormControl from 'material-ui/Form/FormControl';
// import FormHelperText from 'material-ui/Form/FormHelperText';

// import FormControl, {styleSheet} from 'modules/Site/components/UI/Form/FormControl';

import PropTypes from 'prop-types';

import moment from 'moment';

import Button from 'material-ui/Button';
// import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

import { Editor } from 'react-draft-wysiwyg';

import {
	// Editor, 
	EditorState,
	convertFromHTML,
	ContentState,
  convertToRaw, 
  convertFromRaw,
} from 'draft-js';

// import customPropTypes from 'material-ui/utils/customPropTypes';

import {stateToHTML} from 'draft-js-export-html';


export class TextField extends Component {


  static contextTypes = {
    // styleManager: customPropTypes.muiRequired,
  };


	constructor(props){
		

		super(props);

		const {
			value,
		} = props;

		// const blocksFromHTML = convertFromHTML(value);

		// const blocksFromHTML;

		// const state = ContentState.createFromBlockArray(
		//   blocksFromHTML.contentBlocks,
		//   blocksFromHTML.entityMap
		// );


    const editorState = this.initEditState(value); 

		this.state = {
  		// editorState: EditorState.createWithContent(state),
  		editorState,
		};

	}

  initEditState(content){
    var editorState;
 

    var state = null;

    // if(content && typeof content == "string"){ 

    //   /*
    //   * Пытаемся распарсить JSON
    //   * */
    //   try{
    //     var json = JSON.parse(content);

    //     if(json){
    //       content = json;
    //     }
    //   }
    //   catch(e){

    //   }

    //   if(!content.blocks){
    //     // if(typeof window != "undefined"){
    //     // }

    //     if(typeof window != "undefined"){
    //       var blocks = convertFromHTML(content);
    //       state = ContentState.createFromBlockArray(blocks);
    //     }

    //     /*
    //       В роутере server-side прописана функция виртуализации DOM.
    //       https://github.com/facebook/draft-js/issues/586#issuecomment-300347678
    //     */
    //     else if(global.serverDOMBuilder){

    //       const blocks = convertFromHTML(content, global.serverDOMBuilder);
    //       // const blocks = global.serverDOMBuilder(content, convertFromHTML);

    //       state = ContentState.createFromBlockArray(blocks);
    //     }
    //   }
    // }

    if(!state && content && content.blocks){
      state = convertFromRaw(content);
    }
 
    if(state){
      editorState = EditorState.createWithContent(state);
    }
    else{
      editorState = EditorState.createEmpty();
    }
 


    // return EditorState.set(editorState, {decorator: decorator});


    return editorState;
  }


	onEditorChange(editorState){

		this.setState({
			editorState,
		});

		// let value = editorState && stateToHTML(editorState.getCurrentContent());

		// if(value === "<p><br></p>"){
		// 	value = "";
		// }
    

    let currentContent = editorState.getCurrentContent();
    var plainText = currentContent.getPlainText(); 


    // const value = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const value = convertToRaw(currentContent);
    // const value = "";

		const {
			onChange,
		} = this.props;

		const {
			name,
		} = this.props;

		onChange && onChange({
			target: {
				name,
				value,
			},
		});

		onChange && onChange({
			target: {
				name: "plainText",
				value: plainText,
			},
		});

	}


	render(){

	  const {
	    onChange,
			readOnly,
	    ...other
	  } = this.props;

		const {
			editorState,
		} = this.state;

	  return <Editor 
  		{...other}
  		editorState={editorState} 
  		onEditorStateChange={::this.onEditorChange}
			readOnly={readOnly}
			toolbarHidden={readOnly ? true : false}
			wrapperClassName={["rdw-editor-wrapper", readOnly ? "readonly" : "editable"].join(" ")}
			toolbar={{
				options: ['inline', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history'],
				// fontFamily: {
				// 	options: [],
				// },
				inline: {
			    // inDropdown: false,
			    // className: undefined,
			    // component: undefined,
			    // dropdownClassName: undefined,
			    options: ['bold', 'italic', 'underline', 'strikethrough'],
			    // bold: { icon: bold, className: undefined, title: undefined },
			    // italic: { icon: italic, className: undefined, title: undefined },
			    // underline: { icon: underline, className: undefined, title: undefined },
			    // strikethrough: { icon: strikethrough, className: undefined, title: undefined },
			    // monospace: { icon: monospace, className: undefined, title: undefined },
			    // superscript: { icon: superscript, className: undefined, title: undefined },
			    // subscript: { icon: subscript, className: undefined, title: undefined },
			  },
			  link: {
			    // inDropdown: false,
			    // className: undefined,
			    // component: undefined,
			    // popupClassName: undefined,
			    // dropdownClassName: undefined,
			    showOpenOptionOnHover: readOnly ? false : true,
			    defaultTargetOption: '_blank',
			    // options: ['link', 'unlink'],
			  },
			}}
  	/>;

	}

}

TextField.defaultProps = {
  required: false,
};

export default TextField;


