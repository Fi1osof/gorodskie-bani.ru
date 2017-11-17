// @flow

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

		this.state = {
  		// editorState: EditorState.createWithContent(state),
		};

	}


	onEditorChange(editorState){

		this.setState({
			editorState,
		});

		// let value = editorState && stateToHTML(editorState.getCurrentContent());

		// if(value === "<p><br></p>"){
		// 	value = "";
		// }
    
  //   const value = JSON.stringify(convertToRaw(currentContent));
    const value = "";

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

	}


	render(){

	  const {
	    onChange,
	    ...other
	  } = this.props;

		const {
			editorState,
		} = this.state;

	  return <Editor 
  		{...other}
  		editorState={editorState} 
  		onEditorStateChange={::this.onEditorChange}
  	/>;

	}

}

TextField.defaultProps = {
  required: false,
};

export default TextField;


