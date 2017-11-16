
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {List} from 'immutable';

import moment from 'moment';

// import {objectToDate} from '';

export default class ScheduleField extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		field: PropTypes.string.isRequired,
	};

	static defaultProps = {
		field: "schedule",
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

		if(!item){
			return null;
		}

		// let {
		// 	schedule,
		// } = item;

		let schedule = item[field];

		if(!schedule){
			return null;
		}

		let offDates = [];

		const schedule_string = JSON.stringify(schedule);

		// schedule = List(schedule || []).map((n, index) => {

		// 	// Добавляем порядковый индекс дня
		// 	n && (n.day = index);

		// 	return n;

		// }).filter(n => n);

		schedule = List(schedule || []).filter(n => n);

		[0,1,2,3,4,5,6].map(day => {

			if(schedule.findIndex(n => n && n.start && n.start.weekDay === day) === -1){
				offDates.push(day);
			}

		});

		// console.log('offDates', offDates, schedule);

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

		// console.log('schedule List', schedule.toArray());

		const scheduleGrouped = schedule.groupBy(n => {

			const {
				start,
				end,
			} = n;

			const {
				hour,
				minute,
			} = start;

			const {
				hour: endHour,
				minute: endMinute,
			} = end;

			// console.log('schedule grouped n JSON.stringify({start, end})', n, JSON.stringify({start, end}));

			// return JSON.stringify({start, end});

			return JSON.stringify({hour, minute, endHour, endMinute});

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
		
			// console.log(`schedule grouped n ${index}`, n.toArray());

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

			// n.map(i => {

			// 	const {
			// 		day,
			// 	} = i || {};

			// 	// array.push(<p
			// 	// 	key={array.length}
			// 	// >
			// 	// 	{JSON.stringify(i)}
			// 	// </p>);

			// 	daysArray.push(days[day]);

			// });

			const days2 = n && n.map(i => i && i.start && i.start.weekDay);

			// console.log("daysArray2 reduce days2", days2, n);

			// Проходим по каждому дню, и если дни соседние, то объединяем их через тире
			let daysArray2 = days2 && days2.reduce((prev, next) => {

				/*
					Если предыдущий вариант не массив,
					возвращаем массив
				*/

				// console.log("daysArray2 reduce prev, next", prev, next);

				let result;

				if(Array.isArray(prev)){
					result = prev;
					// result.push(next);
				}
				else{
					result = [prev];
					// result.push(next);
				}

				let prevValue = result[result.length - 1];


				if(Array.isArray(prevValue)){

					// prev.push(next);

					if(next - 1 === prevValue[prevValue.length - 1]){

						prevValue.push(next);
						result[result.length - 1] = prevValue;

					}
					else {

						result.push([next]);

					}

					// prevValue.push(next);

				}
				else{

					// if(next - 1 === prevValue){
					// 	result[result.length - 1] = [prev, next];
					// }
					// else{

					// 	result.push(next);

					// }

					if(next - 1 === prevValue){
						result[result.length - 1] = [prevValue, next];
					}
					else{

						result.push(next);

					}

					// prevValue = [prevValue];

					// prevValue.push(next);

					// result[result.length - 1] = prevValue;

					// if(next - 1 === prevValue){
					// 	result[result.length - 1] = [prev, next];
					// }
					// else{

					// 	result.push(next);

					// }

					// result.push(next);

					// prevValue = [prevValue];

					// result[result.length - 1] = prevValue;

				}


				// console.log("daysArray2 reduce result", result);


				// die();

				return result;

			});

			// console.log("daysArray2", daysArray2);



			// daysArray2 = [[0], [1], [3,6]];

			if(daysArray2 !== undefined){

				if(Array.isArray(daysArray2)){

					daysArray2 = daysArray2.map(i => {

						// const {
						// 	day,
						// } = i || {};

						// if(Array.isArray(i)){

						// }
						// else{

						// 	daysArray.push(days[i]);

						// }

						// console.log('daysArray 3', i);

						if(Array.isArray(i)){

							const first = days[i[0]];
							const last = days[i[i.length - 1]];

							if(i.length > 2){
							

								return `${first}-${last}`;

							}
							else if(i.length === 2){
								
								// const first = days[i[0]];
								// const last = days[i[i.length - 1]];

								return [first,last].join(", ");

							}
							else{
								return first;
							}

						}
						else{
							
							return days[i];

						}

					});

					daysArray2.map(n => {
						daysArray.push(n);
					});

					// console.log('daysArray222', daysArray2, daysArray);

				}
				else{
					
					daysArray.push(days[daysArray2]);

				}

			}



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

			let title;

			title = daysArray.join(", ");

			if(title === "Пн-Вс"){
				title = "";
			}
			else if(title === "Пн-Пт"){
				title = "Будние";
			}
			else if(title === "Сб, Вс"){
				title = "Выходные";
			}
			else{

			}

			title = title && <span><b>{title}</b>:</span> || null;

			daysList.push(<div
				key={daysList.length}
				style={{
					margin: "5px 0",
				}}
			>
				{title} {from === "00:00" && till === "00:00" ? "Круглосуточно" : `с ${from} до ${till}`}

			</div>);

		});


		let schedulesList = [];


		let offDatesStr;

		if(offDates && offDates.length){

			offDatesStr = <div>
				<span
					style={{
						color: "red",
					}}
				>Выходные</span>: {offDates.map(day => (days[day])).join(", ")}
			</div>

		}

		return <div
			{...other}
		>

			{daysList}

			{offDatesStr}

		</div>
	}
}
