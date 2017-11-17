// @flow

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Editor from './src';

export class TextField extends Component {


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

TextField.defaultProps = {
  required: false,
};

export default TextField;


