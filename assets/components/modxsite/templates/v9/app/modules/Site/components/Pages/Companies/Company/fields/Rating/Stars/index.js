
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';

import StarIcon from 'material-ui-icons/Star';
import StarEmptyIcon from 'material-ui-icons/StarBorder';
import StarHalfIcon from 'material-ui-icons/StarHalf';

export default class Start extends Component{

	static defaultProps = {
		allowEdit: false,
	};

	static propTypes = {
		value: PropTypes.number.isRequired,
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
			value,
			allowEdit,
			...other
		} = this.props;

		let rating = value;

		let {
			inEditMode,
			editedRating,
		} = this.state;

		inEditMode = inEditMode && allowEdit || false;

		if(inEditMode){
			rating = editedRating || 0;
		}

		let stars = [];

		const values = [1,2,3,4,5]

		values.map(i => {

			let star;
			let Icon;
			let color;

			if(i <= rating + 0.3){
				Icon = StarIcon;
				color="red";
			}
			else if(rating - i >= -0.7 ){
				Icon = StarHalfIcon;
				color="red";
			}
			else{
				Icon = StarEmptyIcon;
			}

			star = <Icon 
				key={i}
				color={color}
				style={{
					cursor: allowEdit ? 'pointer' : 'inherit',
				}}
				onMouseOver={event => {
					this.setState({
						editedRating: i,
					});
				}}
				// onClick={event => {

				// 	alert("Извините, возможность голосования появится чуть позже.");

				// 	// this.setState({
				// 	// 	inEditMode: !inEditMode,
				// 	// });
				// }}
			/>

			stars.push(star);
		});

		return <div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
			// onMouseOver={event => {
			// 	this.setState({
			// 		inEditMode: true,
			// 	});
			// }}
			// onMouseOut={event => {
			// 	this.setState({
			// 		inEditMode: false,
			// 	});
			// }}
			{...other}
		>{stars}</div>
	}
}
