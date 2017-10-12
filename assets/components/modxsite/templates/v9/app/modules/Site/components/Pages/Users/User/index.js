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

			console.log("Resources r", r);

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

