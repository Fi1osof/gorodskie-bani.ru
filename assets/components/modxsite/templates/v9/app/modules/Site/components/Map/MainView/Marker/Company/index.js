
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router';

import Stars from 'modules/Site/components/Pages/Companies/Company/fields/Rating/Stars';

export default class CompanyMiniCart extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		ratings: PropTypes.object,
	};

	static defaultProps = {
		imageType: "marker_thumb",
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
			imageType,
			ratings,
			...other
		} = this.props;

		if(!item){
			return null;
		}		

		const {
			name,
			alias,
			image,
			imageFormats,
			// ratingAvg,
			_isDirty,
		} = item;

		// const {
  //     rating,
  //     // max_vote,
  //     // min_vote,
  //     // quantity,
  //     // quantity_voters,
		// } = ratingAvg || {};

		const {
      rating,
      // max_vote,
      // min_vote,
      // quantity,
      // quantity_voters,
		} = ratings || {};



		const link = `/bani/${alias}/`;

		return <div
			{...other}
		>
			<div
				style={{
					paddingBottom: 5,
					fontSize: 14,
				}}
			>
				
				<Link
					to={link}
					href={link}
				>
					{name}
				</Link>

				<Stars 
					value={parseFloat(rating) || 0}
				/>
			</div>

			{imageFormats
				?
				<Link
					to={link}
					href={link}
				>
					<img 
						src={imageFormats[imageType]}
						style={{
							width: "100%",
						}}
					/>
				</Link>
				:
				null
			}
		</div>
	}
}
