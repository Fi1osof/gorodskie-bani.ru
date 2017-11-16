
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import {Link} from 'react-router';

import Stars from 'modules/Site/components/Pages/Companies/Company/fields/Rating/Stars';

import Schedule from 'modules/Site/components/fields/Schedule';

export default class CompanyListCart extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		mode: PropTypes.oneOf(['list', 'module']).isRequired,
	};

	static defaultProps = {
		mode: "module",
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
			mode,
		} = this.props;

		if(!item){
			return null;
		}

		const {
			name,
			uri,
			imageFormats,
			tvs,
			ratingAvg,
			schedule,
		} = item;

		const {
			address,
		} = tvs || {};

		const {
			rating,
		} = ratingAvg || {};

		const {
			slider_thumb: image,
		} = imageFormats || {};

		let cart = null;

		if(mode === "module"){

			cart = <Grid
				item
				xs={12}
				sm={6}
				md={4}
				lg={3}
				// xl={2}
			>

				<Link
					to={uri}
					href={uri}
					title={name}
				>

					<div
						style={{
							position: "relative",
						}}
					>
						
						<img 
							src={image}
							style={{
								width: "100%",
							}}
						/>

						{rating && <Stars 
							value={parseFloat(rating) || 0}
							style={{
								position: "absolute",
								top: 3,
								right: 3,
							}}
						/> || null}

					</div>

					<div
						style={{
							padding: 15,
						}}
					>

						<Typography
							type="title"
						>
							{name}
						</Typography>
						
						<p
							className="text default"
						>
							{address}
						</p>
									
						<Schedule 
							item={item}
							className="text default"
						/>

					</div>

				</Link>
				

			</Grid>


		}
		// else{
			
		// 	cart = <Grid
		// 		item
		// 		xs={12}
		// 		// xl={2}
		// 	>
		// 		<Paper
		// 			style={{
		// 				margin: "15px 0",
		// 			}}
		// 		>
					
		// 			<Link
		// 				to={uri}
		// 				href={uri}
		// 				title={name}
		// 			>

		// 				<Grid
		// 					container
		// 					gutter={0}
		// 				>

		// 					<Grid
		// 						item
		// 						xs={3}
		// 					>
								
		// 						<div
		// 							style={{
		// 								position: "relative",
		// 							}}
		// 						>
									
		// 							<img 
		// 								src={image}
		// 								style={{
		// 									width: "100%",
		// 								}}
		// 							/>

		// 							{rating && <Stars 
		// 								value={parseFloat(rating) || 0}
		// 								style={{
		// 									position: "absolute",
		// 									top: 3,
		// 									right: 3,
		// 								}}
		// 							/> || null}

		// 						</div>

		// 					</Grid>

		// 					<Grid
		// 						item
		// 						xs={9}
		// 						style={{
		// 							padding: 10,
		// 						}}
		// 					>

		// 						<div
		// 							style={{
		// 								padding: 0,
		// 							}}
		// 						>

		// 							<Typography
		// 								type="title"
		// 							>
		// 								{name}
		// 							</Typography>
									
		// 							<p
		// 								className="text default"
		// 							>
		// 								{address}
		// 							</p>

		// 						</div>

		// 					</Grid>
							
		// 				</Grid>

		// 			</Link>

		// 		</Paper>

		// 	</Grid>

		// }

		return cart;
	}
}
