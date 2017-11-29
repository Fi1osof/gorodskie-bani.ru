// @flow

import React, { Component } from 'react';

import PropTypes from 'prop-types';

// import Editor from './src';
import Editor from 'react-cms/src/app/components/Editor';

export default class TextField extends Component {


  static contextTypes = {
  };


	constructor(props){

		super(props);

		this.state = {
		};

	}


	render(){

	  const {
	    ...other
	  } = this.props;

	  return <Editor
  		{...other}
  	/>;

	}

}

// TextField.defaultProps = {
//   required: false,
// };

// export default TextField;


