import React, {Component} from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import Page from '../layout'; 

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import {Link, browserHistory} from 'react-router';

// import Topic from './Topic';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import SuccessIcon from 'material-ui-icons/Check';
import FailureIcon from 'material-ui-icons/Clear';
import SaveIcon from 'material-ui-icons/Save';

import UserAvatar from 'modules/Site/components/fields/User/avatar';

import Pagination from 'modules/Site/components/pagination';

import User from './User';
import Compred from './Compred';

export default class UsersPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			limit: 10,
			total: 0,
			users: [],
			delegatesOnly: false,
			compredOpen: false,
		});
	}

	componentDidMount(){

		// const {
		// 	TopicsStore,
		// } = this.context;

		// this.TopicsStoreListener = TopicsStore.getDispatcher().register(payload => {

		// 	this.loadData();

		// });

		this.loadData();

		super.componentDidMount && super.componentDidMount();
	}


	componentDidUpdate(prevProps, prevState, prevContext){

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
			delegatesOnly,
		} = this.state;

		let result = localQuery({
			operationName: "Users",
			variables: {
				limit: 10,
				usersPage: page,
				withPagination: true,
				userGetComments: true,
				getImageFormats: true,
				usersDelegatesOnly: delegatesOnly,
				// resourcesLimit: 10,
				// resourceGetAuthor: true,
				// resourceGetComments: true,
				// getCommentAuthor: true,
			},
		})
		.then(r => {

			// console.log("Resources r", r);

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

	onDelegatedChange = (event, checked) => {

		// console.log('onDelegatedChange', event, checked);

		this.setState({
			delegatesOnly: checked,
		}, () => {
			this.loadData();
		});

	}
	
	renderUser(username){

		return <User 
			username={username}
		/>;

	}

	updateUser(user, data){

		const {
			updateItem,
			UsersStore,
		} = this.context;

		const {
			id,
		} = user;

		if(!id){
			return;
		}

		const storeUser = UsersStore.getState().find(n => n.id === id);

		if(storeUser){

			updateItem(storeUser, data, UsersStore);

		}

	}

	saveItem(user){

		// console.log('saveItem', user);

		const {
			saveItem,
			UsersStore,
		} = this.context;

		const {
			id,
		} = user;

		if(!id){
			return;
		}

		const storeUser = UsersStore.getState().find(n => n.id === id);

		if(storeUser){

			saveItem(UsersStore, storeUser, "crm/users/");

		}

	}


	onUpdateField = (event, user) => {

		const {
			name,
			value,
		} = event.target;

		let data = {};

		// console.log('value', value);

		data[name] = value;

		switch(name){

			case 'offer_date':
			case 'contract_date':

				data[name] = new Date(value).getTime() / 1000;

				break;

		}


		// console.log('data', data);

		this.updateUser(user, data); 

	}


	renderUsers(){


		const {
			params,
		} = this.props;

		const {
			user: systemUser,
			updateItem,
		} = this.context;

		const {
			users,
			page,
			limit,
			total,
			delegatesOnly,
			compredOpen,
		} = this.state;

		let content;

		let rows = [];

		const hasCRMPerm = systemUser.hasPermission("CRM");

		users && users.map(user => {

			const {
				id,
				username,
				fullname,
				email,
				comments,
				createdon,
				delegate,
				offer_date,
				contract_date,
				active,
				offer,
				_Dirty,
			} = user;

			// console.log("user", user);

			let crmColumns = [];

			if(hasCRMPerm){

				crmColumns.push(<TableCell
					key="isActive"
				>
					{active === true ? <SuccessIcon color="green"/> : active === false ? <FailureIcon color="red"/> : ""}
				</TableCell>)

				crmColumns.push(<TableCell
					key="delegate"
				>
					{delegate === true ? <SuccessIcon color="green"/> : delegate === false ? <FailureIcon color="red"/> : ""}
				</TableCell>)

				crmColumns.push(<TableCell
					key="offerDate"
				>

					<TextField
						type="date"
						name="offer_date"
						value={offer_date && moment(offer_date * 1000).format("YYYY-MM-DD") || ""}
						onChange={event => this.onUpdateField(event, user)}
					/>

				</TableCell>)

				crmColumns.push(<TableCell
					key="contract"
				>

					<TextField
						type="date"
						name="contract_date"
						value={contract_date && moment(contract_date * 1000).format("YYYY-MM-DD") || ""}
						onChange={event => this.onUpdateField(event, user)}
					/>

				</TableCell>)

				crmColumns.push(<TableCell
					key="offter"
				>

					{/*offer && <div dangerouslySetInnerHTML={{__html: offer}}></div> || ""*/}
					{offer && <Button >Показать текст</Button>|| ""}

				</TableCell>)

			}

			rows.push(<TableRow
				key={id}
			>
				
				<TableCell>

					<Grid
						container
      			gutter={0}
						align="center"
						style={{
							flexWrap: "nowrap",
						}}
					>
						
						{_Dirty ? 
							<IconButton 
								onClick={() => {
									this.saveItem(user);
								}}
							>
								<SaveIcon 
									color="red"
								/>
							</IconButton>
						 : ""}

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
					{createdon && moment(createdon * 1000).format("YYYY-MM-DD") || ""}
				</TableCell>

				<TableCell>
					{comments && comments.length || ""}
				</TableCell>
				
				<TableCell>
					{email || "Нет прав на просмотр"}
				</TableCell>

				{crmColumns}

			</TableRow>);

		});

		if(!rows || !rows.length){
			return null;
		}



		let crmColumns = [];

		if(hasCRMPerm){

			crmColumns.push(<TableCell
				key="isActive"
			>
				Активен
			</TableCell>);

			crmColumns.push(<TableCell
				key="delegate"
			>
				Представитель
			</TableCell>);

			crmColumns.push(<TableCell
				key="offer_date"
			>
				Дата предложения
			</TableCell>);


			crmColumns.push(<TableCell
				key="contract"
			>
				Сделка
			</TableCell>);

			crmColumns.push(<TableCell
				key="offer"
			>
				Предложение
			</TableCell>);
		}

		return <div
			style={{
				width: "100%",
			}}
		>

			{hasCRMPerm 
				?
					<Paper
						style={{
							width: "100%",
							margin: "30px 0",
						}}
					>

						<Grid
							container
							align="center"
							gutter={0}
						>
							
							<Checkbox
								checked={delegatesOnly}
								onChange={this.onDelegatedChange}
							/>	Только представители

							<Button 
								onClick={event => {
									this.setState({
										compredOpen: true,
									});
								}}
							>
								Добавить контакт
							</Button>

							{compredOpen 
								?
								<Compred 
								/>
								:
								null
							}

						</Grid>

					</Paper>
				:
				null
			
			}

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
								Дата регистрации
							</TableCell>
							
							<TableCell>
								Комментарии
							</TableCell>
							
							<TableCell>
								Емейл
							</TableCell>

							{crmColumns}

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

	}

	renderContent(){

		let {
			params,
		} = this.props;

		let {
			username,
		} = params || {};

		let content;

		if(username){
			
			content = this.renderUser(username);

		}
		else{

			content = this.renderUsers();

		}




		return <div
			style={{
				width: "100%",
			}}
		>
 			
 			{content}


		</div>
	}

}

