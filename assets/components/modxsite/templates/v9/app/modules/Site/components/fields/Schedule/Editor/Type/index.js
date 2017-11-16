
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ReactSchedule from 'react-schedule/src/';
import 'react-schedule/src/styles/styles.less';

import Schedule from 'modules/Site/components/fields/Schedule';

export default class ScheduleEditorTypeField extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		field: PropTypes.string.isRequired,
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
			field,
			...other
		} = this.props;

		if(!item || !field){
			return null;
		}

		const schedule = item[field];

		return <div>
			
			<Schedule 
				item={item}
			/>

			<ReactSchedule 
				days={schedule || []}
				{...other}
			/>

		</div>;
	}
}
