
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {List} from 'immutable';

export default class ScheduleField extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
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

		let {
			schedule,
		} = item;

		if(!schedule){
			return null;
		}

		const schedule_string = JSON.stringify(schedule);

		schedule = List(schedule || []).map((n, index) => {

			// Добавляем порядковый индекс дня
			n && (n.day = index);

			return n;

		}).filter(n => n);

		// schedule = List([
		// 	{
		// 		id: 1,
		// 	},
		// 	{
		// 		id: 2,
		// 	},
		// 	{
		// 		id: 1,
		// 	},
		// 	{
		// 		id: 2,
		// 	},
		// 	{
		// 		id: 1,
		// 	},
		// ]);

		// console.log('schedule List 2', schedule.toArray());

		const scheduleGrouped = schedule.groupBy(n => {

			const {
				start,
				end,
			} = n;

			// console.log('schedule grouped n JSON.stringify({start, end})', n, JSON.stringify({start, end}));

			return JSON.stringify({start, end});
		});

		// schedule = schedule.groupBy(n => n.id);

		// console.log('schedule grouped', schedule.toArray());
		// console.log('schedule grouped', schedule);

		let days = [
			'Пн',
			'Вт',
			'Ср',
			'Чт',
			'Пт',
			'Сб',
			'Вс',
		];

		let daysList = [];

		scheduleGrouped.map((n, index) => {
		
			console.log(`schedule grouped n ${index}`, n.toArray());

			// let array = [];

			let daysArray = [];

			const first = n.get(0);

			const {
				start,
				end,
			} = first;

			if(!start || !end){
				return;
			}

			n.map(i => {

				const {
					day,
				} = i || {};

				// array.push(<p
				// 	key={array.length}
				// >
				// 	{JSON.stringify(i)}
				// </p>);

				daysArray.push(days[day]);

			});

			const {
				hour: startHour,
				minute: startMinute,
			} = start;

			const {
				hour: endHour,
				minute: endMinute,
			} = end;

			const from = moment(`${startHour}:${startMinute}`, "HH:mm").format("HH:mm");
			const till = moment(`${endHour}:${endMinute}`, "HH:mm").format("HH:mm");

			daysList.push(<div
				key={daysList.length}
				style={{
					margin: "30px 0",
				}}
			>
				<div>
					<b>{daysArray.join(", ")}</b>: {from === "00:00" && till === "00:00" ? "Круглосуточно" : `с ${from} до ${till}`}
				</div>

			</div>);

		});


		let schedulesList = [];

		return <div
			{...other}
		>

			{daysList}

		</div>
	}
}
