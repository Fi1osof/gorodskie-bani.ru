import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

// import Topic from './Topic';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import UserAvatar from 'modules/Site/components/fields/User/avatar';

import Pagination from 'modules/Site/components/pagination';

export default class UsersPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			limit: 10,
			total: 0,
			users: [],
		});
	}

	componentDidMount(){

		const {
			TopicsStore,
		} = this.context;

		this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.loadData();
	}


	componentDidUpdate(prevProps, prevState, prevContext){

		console.log('Users componentDidUpdate', prevProps, prevState, prevContext);

		const {
			router,
		} = this.context;


		const {
			location: {
				query,
			},
		} = router;

		const {
			page,
		} = query || {};

		if(page !== this.state.page){
			this.setState({
				page,
			}, () => this.loadData());
		}

		// const {
		// 	router: prevRouter,
		// } = prevContext;

		// if(router && prevRouter){

		// 	const {
		// 		location: {
		// 			query,
		// 		},
		// 	} = router;

		// 	const {
		// 		location: {
		// 			query: prevQuery,
		// 		},
		// 	} = prevRouter;

		// 	if(query && prevQuery){

		// 		const {
		// 			page,
		// 		} = query;

		// 	}

		// }

		super.componentDidUpdate && super.componentDidUpdate();
	}
	

	loadData(){


		const {
			localQuery,
		} = this.context;

		const {
			page,
		} = this.state;

		let result = localQuery({
			operationName: "Users",
			variables: {
				limit: 10,
				usersPage: page,
				withPagination: true,
				userGetComments: true,
				getImageFormats: true,
				// resourcesLimit: 10,
				// resourceGetAuthor: true,
				// resourceGetComments: true,
				// getCommentAuthor: true,
			},
		})
		.then(r => {

			console.log("Resources r", r);

			const {
				usersList,
			} = r.data;

			const {
				count,
				total,
				object: users,
			} = usersList || {};

			this.setState({
				users,
				total,
			});
		}); 

		// console.log("Resources r", result);
		
		
	}


	// renderTopics(){

	// 	const {
	// 		users,
	// 		limit,
	// 	} = this.state;

	// 	console.log("Users", users);

	// 	let topicsList = [];

	// 	topics && topics.map((topic, index) => {

	// 		if(limit > 0 && topicsList.length >= limit){
	// 			return;
	// 		}

	// 		const {
	// 			id,
	// 			name,
	// 		} = topic;

	// 		topicsList.push(<Topic
	// 			key={id}
	// 			item={topic}
	// 			open={false}
	// 			commentOpen={false}
	// 		>
	// 			{name}
	// 		</Topic>);

	// 	});

	// 	let moreButton;

	// 	if(topicsList && topics && topicsList.length < topics.length){

	// 		moreButton = <div
	// 			style={{
	// 				textAlign: "center",
	// 			}}
	// 		>
				
	// 			<Button
	// 				onClick={event => {

	// 					this.setState({
	// 						limit: limit + 10,
	// 					});

	// 				}}
	// 				raised
	// 			>
	// 				Показать еще
	// 			</Button>

	// 		</div>

	// 	}

	// 	return <div>
	// 		{topicsList}

	// 		{moreButton}
	// 	</div>

	// }

	
	renderContent(){

		const {
			params,
		} = this.props;

		// {
		// 	TopicsStore,
		// } = this.context;

		const {
			users,
			page,
			limit,
			total,
		} = this.state;

		let rows = [];

		users && users.map(user => {

			const {
				id,
				username,
				fullname,
				email,
				comments,
			} = user;

			rows.push(<TableRow
				key={id}
			>
				
				<TableCell>

					<Grid
						container
						align="center"
					>
						
		        <UserAvatar 
		        	user={user}
		        	style={{
		        		marginRight: 10,
		        	}}
		        />
						
						<Link
							to={`/profile/${username}`}
							href={`/profile/${username}`}
						>
							{fullname || username}
						</Link>

					</Grid>

				</TableCell>

				<TableCell>
					{comments && comments.length || ""}
				</TableCell>
				
				<TableCell>
					{email || "Нет прав на просмотр"}
				</TableCell>

			</TableRow>);

		});

		if(!rows || !rows.length){
			return null;
		}

		return <div
			style={{
				width: "100%",
			}}
		>
			
			<Paper
				style={{
					overflow: "auto",
					width: "100%",
					margin: "30px 0",
				}}
			>
				
				<Table>
						
					<TableHead>
						
						<TableRow>

							<TableCell>
								Пользователь
							</TableCell>
							
							<TableCell>
								Комментарии
							</TableCell>
							
							<TableCell>
								Емейл
							</TableCell>

						</TableRow>

					</TableHead>

					<TableBody>

						{rows}
						
					</TableBody>


				</Table>
				

			</Paper>

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

		</div>


		return;

		const {
			topics,
		} = this.state;

		const {
			topicAlias,
		} = params || {};

		// let item;
		// let company;

		let content;

		if(topicAlias){
			
			// const item = TopicsStore.getState().find(n => n.id == topicAlias || n.alias == topicAlias);
			const item = topics && topics.find(n => n.id == topicAlias || n.alias == topicAlias.replace(".html", ""));

			if(item){

				content = <Grid
					item
				>
					
					<Topic
						item={item}
						open={true}
					/>

				</Grid>

			}
			else{
				content = <div
					style={{
						color: "red",
					}}
				>
					Документ не был найден
				</div>
			}

		}
		else{
			content = this.renderTopics();
		}

		// console.log('CompaniesPage 2 item', item, companyId);

		return <div>
 			
 			{content}


		</div>
	}

}

