import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../../layout'; 

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import {Link, browserHistory} from 'react-router';

// import Topic from './Topic';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
// import Paper from 'material-ui/Paper';

import Comments from 'modules/Site/components/Comments';

import UserAvatar from 'modules/Site/components/fields/User/avatar';

export default class UserPage extends Component {

	static propTypes = {
		// user: PropTypes.object.isRequired,
		username: PropTypes.string.isRequired,
	};

	static contextTypes = {
		UsersStore: PropTypes.object.isRequired,
		CommentsStore: PropTypes.object.isRequired,
		localQuery: PropTypes.func.isRequired,
		removeQuery: PropTypes.func.isRequired,
		request: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    documentActions: PropTypes.object.isRequired,
	};


	constructor(props){

		super(props);

		this.state = {
			user: null,
		};

	}



	componentDidMount(){

		const {
			UsersStore,
			CommentsStore,
		} = this.context;

		this.UsersStoreListener = UsersStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.CommentsStoreListener = CommentsStore.getDispatcher().register(payload => {

			this.loadData();

		});

		this.loadData();

		this.processAction();

		super.componentDidMount && super.componentDidMount();
	}

	
	processAction(){

		if(typeof window === "undefined"){
			return;
		}

		const {
			params: {
				action,
			},
		} = this.context.router;

		switch(action){

			case "activation":

				this.processActivation();

				break;

			default:;

		}


	}

	// Активация пользователя
	processActivation(){

		const {
			params: {
				action,
			},
			location,
		} = this.context.router;

		const {
			request,
		} = this.context;

		const {
			username,
		} = this.props;

		const {
			k: key,
		} = location.query || {};

		request("activation", false, "users/activate", {
			username,
			key,
		}, {

			callback: (data, errors) => {

				console.log("activation result", data, errors);

				const {
					success,
					message,
				} = data;

				if(success){

					const {
						userActions,
						documentActions,
					} = this.context;

					documentActions.addInformerMessage({
						type: "success",
						text: message || "Пользователь успешно активирован",
						autohide: 5000,
					});

					browserHistory.replace(`/profile/${username}`);
					
					userActions.GetOwnData();

				}

			},

		});

	}


	loadData(){


		const {
			localQuery,
		} = this.context;

		const {
			username,
		} = this.props;

		let result = localQuery({
			operationName: "User",
			variables: {
				username,
				// usersPage: page,
				// withPagination: true,
				userGetComments: true,
				getImageFormats: true,
				// resourcesLimit: 10,
				// resourceGetAuthor: true,
				// resourceGetComments: true,
				getCommentAuthor: true,
			},
		})
		.then(r => {

			// console.log("Resources r", r);

			const {
				user,
			} = r.data;

			// const {
			// 	count,
			// 	total,
			// 	object: users,
			// } = usersList || {};

			this.setState({
				user,
			});
		}); 

		// console.log("Resources r", result);
		
		
	}


	render(){

		const {
			user,
		} = this.state;

		if(!user){
			return null;
		}

		const {
			id,
			username,
			fullname,
			imageFormats,
			comments,
		} = user;

		const {
			middle: image,
		} = imageFormats || {};

		return <div>
			
			<Grid
				container
      	gutter={0}
				style={{
					margin: "30px 0",
				}}
			>

				<Typography
					type="title"
				>

					{fullname || username}
					
				</Typography>

				<Grid
					container
					// style={{
					// 	margin: "30px 0",
					// }}
					gutter={0}
				>

					{image
						?
						<Grid
							item
						>

							<img 
								src={image}
							/>
							
						</Grid>
						:
						null
					}

					<Grid
						item
					>
					
						<Table>
							
							<TableRow>
								
								<TableCell>
									<b>
										Написано комментариев:
									</b>
								</TableCell>
								
								<TableCell>
									{comments && comments.length || 0}
								</TableCell>

							</TableRow>

						</Table>
						
					</Grid>
				
				</Grid>
			</Grid>

			<Comments 
				comments={comments}
			/>

		</div>
	}

}

