
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';

import CloseIcon from 'material-ui-icons/Clear';

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
			closeHandler,
			...other
		} = this.props;

		if(!item){
			return null;
		}		

		const {
			name,
			alias,
			uri,
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



		// const link = `/bani/${alias}/`;
		const link = `/${uri}`;

		return <div
			{...other}
		>
			<div
				style={{
					paddingBottom: 5,
					fontSize: 14,
				}}
			>
				
				<Grid
					container
					align="flex-start"
					gutter={0}
				>
					
					<Grid
						item
						xs
					>
						<Link
							to={link}
							href={link}
						>
							{name}
						</Link>
					</Grid>
					
					{closeHandler
						?
						<Grid
							item
						>
							<IconButton
								onClick={closeHandler}
								style={{
									width: 24,
									height: 24,
									padding: 3,
									marginTop: -6,
								}}
							>
								<CloseIcon />
							</IconButton>
						</Grid>
						:
						null
					}

				</Grid>

				{ratings !== null && <Stars 
					value={parseFloat(rating) || 0}
				/> || null}
				
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
