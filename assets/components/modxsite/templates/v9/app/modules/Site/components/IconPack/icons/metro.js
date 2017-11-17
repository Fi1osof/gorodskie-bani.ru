
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SvgIcon from 'material-ui/SvgIcon';

export default class MetroIcon extends Component{

	static propTypes = {

	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {

		};
	}

	render(){

		const {
			viewBox,
			...other
		} = this.props;

		return <SvgIcon
			viewBox="0 0 95.44 95.441"
			{...other}
		>
<g>
	<g>
		<path d="M47.721,11.712C21.366,11.712,0,33.281,0,59.888c0,14.427,6.226,23.836,6.226,23.836l82.97,0.004
			c0,0,6.244-10.283,6.244-23.841C95.44,33.281,74.074,11.712,47.721,11.712z M85.696,77.859L9.897,77.826
			c0,0-4.039-7.649-4.039-18.09c0-23.32,18.814-42.226,42.023-42.226c23.208,0,42.023,18.905,42.023,42.226
			C89.905,70.295,85.696,77.859,85.696,77.859z"/>
		<polygon points="61.207,24.505 60.608,24.504 47.879,49.447 34.692,24.291 16.637,69.736 11.971,69.736 11.971,73.386 
			37.533,73.386 37.533,69.736 32.461,69.736 37.533,55.533 47.879,73.386 57.82,55.533 62.891,69.736 57.82,69.736 57.82,73.386 
			83.178,73.386 83.178,69.736 78.785,69.736 		"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
			</SvgIcon>
	}
}
