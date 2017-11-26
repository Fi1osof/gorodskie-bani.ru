
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


	componentDidUpdate(prevProps, prevState, prevContext){

		const {
			limit,
		} = this.props;

		const {
			limit: prevLimit,
		} = prevProps;



		if((limit || prevLimit) && limit !== prevLimit){
			this.setState({
				limit,
			});
		}

		super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);
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
			uri,
		} = item;

		let ratingsByType = ratings && ratings.filter(n => n.type === id);



		let ratingsByTypeList;

		// Допольнительно сортируем по рейтингу
		if(ratingsByType && ratingsByType.length){

			ratingsByType = List(ratingsByType);



			ratingsByType = sortBy(ratingsByType, n => n.rating, "desc");



			ratingsByType = ratingsByType.toArray();

			ratingsByTypeList = renderRatings(ratingsByType, limit);



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
				
				<Link
					to={`/${uri}`}
					href={`/${uri}`}
					onClick={event => {

						event.stopPropagation();
						event.preventDefault();

						this.setState({
							limit: 0,
						});
					}}
				>
					<Button 
						raised
					>
						Показать все {ratingsByType.length}
					</Button>
				</Link>

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

				<h3
					style={{
						marginBottom: 20
					}}
				>
					
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
