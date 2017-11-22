
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import ViewModuleIcon from 'material-ui-icons/ViewModule';
import ViewListIcon from 'material-ui-icons/ViewList';

import { Link, browserHistory } from 'react-router';
// window.browserHistory = browserHistory;

import Pagination from 'modules/Site/components/pagination';

import ItemCart from '../Cart';
import Cities from './Cities';

export default class CompaniesList extends Component{

	static propTypes = {
		data: PropTypes.object.isRequired,
	};

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			viewMode: "list",
		};
	}


	switchViewMode(mode){

		let location = browserHistory.getCurrentLocation();

		location.query = Object.assign(location.query || {}, {
			mode,
		});

		browserHistory.push(location);
	}


	getLocationQuery(param){

		const {
			router,
		} = this.context;

		const {
			location,
		} = router;

		return location.query && location.query[param] || undefined;
	}


	render(){

		let {
			// viewMode,
		} = this.state;

		// viewMode = this.getLocationQuery("mode") || viewMode;

		const {
			data,
			cities,
			...other
		} = this.props;

		const {
			page,
			limit,
			total,
			object: items,
		} = data || {};

		// const viewModes = [{
		// 	type: "list",
		// 	title: "Список",
		// 	icon: ViewListIcon,
		// },{
		// 	type: "module",
		// 	title: "Плитка",
		// 	icon: ViewModuleIcon,
		// },];

		let itemsList = [];

		items && items.map(item => {

			const {
				id,
			} = item;

			itemsList.push(<ItemCart 
				key={id}
				item={item}
				// mode={viewMode}
			/>);

		});

		return <Grid
			container
			style={{

			}}
		>

			{cities && <Grid
				item
				xs={12}
			>

				<Cities
					cities={cities}
				/>

			</Grid> || null}

			{/*<Grid
				item
				xs={12}
			>

				<Grid
					container
				>

					{viewModes.map(mode => {

						const {
							type,
							title,
							icon: Icon,
						} = mode;

						return <Grid
							key={type}
							item
							// xs={12}
							// md
						>
							<Button
								raised={type === viewMode}
								onClick={() => {
									this.switchViewMode(type);
								}}
							>
							
								<Icon /> {title}
								
							</Button>

						</Grid>

					})}
					
				</Grid>
				
			</Grid>*/}

			{itemsList}

			<Grid
				item
				xs={12}
			>

				<div
		    	style={{
		    		textAlign: "center",
		    	}}
		    >
		    	
		    	<Pagination
		      	page={parseInt(page) || 1}
			      limit={limit}
			      total={total}
			    />

		    </div>
				
			</Grid>

		</Grid>
	}
}
