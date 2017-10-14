
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import CommentsIcon from 'material-ui-icons/Chat';
import MoreIcon from 'material-ui-icons/More';

import UserLink from 'modules/Site/components/fields/User/link';

import Comments from 'modules/Site/components/Comments';

export default class Topic extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		// item: PropTypes.object,
		open: PropTypes.bool.isRequired,		// Флаг, что это полная статья, раскрытая
	};

	static defaultProps = {
		open: true,
		commentOpen: true,
	};

	static contextTypes = {
		localQuery: PropTypes.func.isRequired,
	};

	constructor(props){

		super(props);

		const {
			open,
			commentOpen,
		} = props;

		this.state = {
			open,
			commentOpen,
		};
	}


	// componentDidMount(){


	// 	this.loadData();

	// }

	// async loadData(){


	// 	const {
	// 		item,
	// 	} = this.props;

	// 	if(!item){
	// 		return;
	// 	}

	// 	const {
	// 		template,
	// 		parent,
	// 	} = item;

	// 	const {
	// 		localQuery,
	// 	} = this.context;

	// 	// let operationName;

	// 	let result;

	// 	if(parent){

	// 		if(template === 28){
	// 			await localQuery({
	// 				operationName: "Company",
	// 				variables: {
	// 					id: parent,
	// 				},
	// 			})
	// 				.then(r => {

	// 					const {
	// 						company,
	// 					} = r.data;

	// 					console.log("Topic localQuery", r);

	// 					result = company;
	// 				});
	// 		}
	// 		else if(template === 15){
	// 			// parent = "other topic";
	// 		}

	// 	}

	// 	if(result){
	// 	}	

	// 	this.setState({
	// 		Parent: result,
	// 	});
	// 	return;

	// }


	render(){

		const {
			item,
		} = this.props;

		if(!item){
			return null;
		}

		const {
			id,
			name:topicName,
			uri,
			short_text,
			summary,
			content:topicContent,
			template,
			Author,
			comments,
			pubdate,
		} = item;

		
		const {
			Parent,
			open,
			commentOpen,
		} = this.state;

		let parent;

		const {
			id:CompanyId,
			name:CompanyName,
			uri:CompanyUri,
		} = Parent || {};

		console.log('Parent', Parent);

		const {
			id: author_id,
			fullname,
			username,
			imageFormats: author_imageFormats,
		} = Author || {};


		let content;


		if(open){

			content = <div dangerouslySetInnerHTML={{__html: topicContent}}></div>;

		}
		else{

			content = <div>

				<span dangerouslySetInnerHTML={{__html: short_text || summary}} />

				{short_text != topicContent 
					? 
					<IconButton 
						onClick={() => {
							this.setState({
								open: true,
							});
						}}
					>
						<MoreIcon
						/>
					</IconButton>
					:
					null
				}

			</div>;

		}


		return <Card
			style={{
				margin: "30px 0",
			}}
		>

			<CardHeader
				title={<Link
					to={uri}
					href={uri}
				>
					<Typography
						type="subheading"
					>
						{topicName}
					</Typography>
				</Link>}
        subheader={CompanyUri && <Link
        	to={CompanyUri}
        	href={CompanyUri}
        >
        	{CompanyName}
        </Link> || undefined}
			>
				
			</CardHeader>

			<CardContent>

				{content}

			</CardContent>

			<CardContent>

				<Grid
					container
      		gutter={0}
					align="center"
				>

					<Grid
						item
					>

						<UserLink 
							user={Author}
						/> 
						
					</Grid>

					<Grid
						item
					>

						| <span
							style={{
								paddingLeft: 10,
							}}
						>{pubdate}</span>
						
					</Grid>

					<Grid
						item
					>

						<Grid
							container
							align="center"
							gutter={0}
						>
						
							| <IconButton 
								onClick={event => {
									this.setState({
										commentOpen: !commentOpen,
									});
								}}
								accent={comments && comments.length && !commentOpen ? true : false}
							>
								<CommentsIcon 
									style={{
										height: 18,
										width: 18,
										marginLeft: 10,
										marginRight: 3,
									}}
								/>
							</IconButton> {comments && comments.length || 0}
						
						</Grid>

					</Grid>


				</Grid>

			{commentOpen 
				?
				<Comments 
					comments={comments}
				/>
				:
				null
			}

			</CardContent>

		</Card>;

	}
}
