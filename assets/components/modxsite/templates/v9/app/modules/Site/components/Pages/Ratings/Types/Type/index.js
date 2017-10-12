
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

import {List} from 'immutable';

import {sortBy} from 'modules/Site/components/ORM/resolver';

export default class RatingTypesType extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		ratings: PropTypes.array.isRequired,
		renderRatings: PropTypes.func.isRequired,
		limit: PropTypes.number,
	};

	static defaultProps = {
		limit: 6,
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		const {
			limit,
		} = props;

		this.state = {
			limit,
		};
	}

	render(){

		const {
			limit,
		} = this.state;

		const {
			item,
			ratings,
			renderRatings,
		} = this.props;

		if(!item || !ratings || !ratings.length){
			return null;
		}

		const {
			id,
			name,
			alias: type_alias,
		} = item;

		let ratingsByType = ratings && ratings.filter(n => n.type === id);

		// console.log("ratingsByType", ratingsByType);

		let ratingsByTypeList;

		if(ratingsByType && ratingsByType.length){

			ratingsByType = List(ratingsByType);

			console.log('ratingsByType', ratingsByType);

			ratingsByType = sortBy(ratingsByType, n => n.rating, "desc");

			console.log('ratingsByType 2', ratingsByType);

			ratingsByType = ratingsByType.toArray();

			ratingsByTypeList = renderRatings(ratingsByType, limit);

			// console.log("ratingsByTypeList", ratingsByTypeList);

		}
		else{
			return null;
		}

		let moreButton;

		if(limit > 0 && ratingsByType && ratingsByType.length > limit){

			moreButton = <div
				style={{
					width: "100%",
					textAlign: "center",
				}}
			>
				
				<Button 
					raised
					onClick={event => {
						this.setState({
							limit: 0,
						});
					}}
				>
					Показать все {ratingsByType.length}
				</Button>

			</div>

		}

		return <Grid
			item
			xs={12}
		>
			<Paper
				style={{
					padding: 15,
					marginBottom: 25,
				}}
			>

				<h3>
					
					<Link
						to={`/ratings/${type_alias}/`}
					>
						{limit > 0
							?
								<span>ТОП {limit} бань в рейтинге {name}</span>
							:
								<span>Все бани в рейтинге {name}</span>
						}
					</Link>

					

				</h3>

				{ratingsByTypeList}

				{moreButton}
				
			</Paper>


		</Grid>;
	}
}
