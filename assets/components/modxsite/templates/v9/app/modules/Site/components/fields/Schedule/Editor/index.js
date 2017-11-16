
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactSchedule from 'react-schedule';

export default class ScheduleEditorField extends Component{

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
			item,
			...other
		} = this.props;

		if(!item){
			return null;
		}

		const {
			schedule,
		} = item;

		return <ReactSchedule 
			days={schedule || []}
			{...other}
		/>;
	}
}
