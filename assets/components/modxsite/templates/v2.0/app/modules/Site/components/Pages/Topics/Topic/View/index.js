
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

import CommentsIcon from 'material-ui-icons/Chat';
import MoreIcon from 'material-ui-icons/More';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';

import UserLink from 'modules/Site/components/fields/User/link';

import Comments from 'modules/Site/components/Comments';

// import Editor from 'modules/Site/components/fields/Editor';

import Editor from '../Editor';

export default class TopicView extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		open: PropTypes.bool.isRequired,		// Флаг, что это полная статья, раскрытая
	};

	static defaultProps = {
		open: true,
		commentOpen: true,
	};

	static contextTypes = {
		localQuery: PropTypes.func.isRequired,
		updateTopicItem: PropTypes.func.isRequired,
		saveTopicItem: PropTypes.func.isRequired,
		// setPageTitle: PropTypes.func.isRequired,
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


	componentDidMount(){


		// this.setPageTitle();

	}


	shouldComponentUpdate(nextProps, nextState){

		const {
			item,
		} = this.props;


		const {
			open,
			commentOpen,
		} = this.state;

		const {
			open: nextOpen,
			commentOpen: nextCommentOpen,
		} = nextState;





		if(
			(item !== nextProps.item)
			|| (open !== nextOpen)
			|| (commentOpen !== nextCommentOpen)
		){
			return true;
		}

		// if(JSON.stringify(item || "") === JSON.stringify(nextProps.item)){
		// 	return false;
		// }

		return false;
	}


	// setPageTitle(title){

	// 	const {
	// 		item,
	// 	} = this.props;

	// 	const {
	// 		setPageTitle,
	// 	} = this.context;

	// 	setPageTitle(title || item.name);
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


	updateItem(item, data, silent){

		const {
			updateTopicItem,
		} = this.context;

		return updateTopicItem(item, data, silent);

	}

	saveItem(){

		const {
			saveTopicItem,
		} = this.context;

		const {
			item,
		} = this.props;

		return saveTopicItem(item);

	}

	// Почему-то не приходит объект события
	onFocus = (name) => {



		this.clearErrors(name);

		return;

	}


	clearErrors(name){
		
		const {
			item,
		} = this.props;

		let {
			_errors: errors,
		} = item;

		if(errors && errors[name]){
			errors[name] = "";
			this.forceUpdate();
		}

	}

	onChange = event => {

		const {
			item,
		} = this.props;

		let data = {};


		const {
			name,
			value,
		} = event.target;



		this.clearErrors(name);

		data[name] = value;

		// switch(name){

		// 	case 'address':
		// 	case 'metro':
		// 	case 'phones':
		// 	case 'site':
		// 	case 'work_time':
		// 	case 'prices':

		// 		let tvs = item.tvs || {};

		// 		tvs[name] = value;

		// 		data.tvs = tvs;

		// 		break;

		// }



		this.updateItem(item, data);

	}


	render(){

		const {
			item,
		} = this.props;



		if(!item){
			return null;
		}

		const serverMode = typeof window === "undefined";

		const {
			id,
			name:topicName,
			pagetitle,
			uri,
			short_text,
			summary,
			content:topicContent,
			template,
			Author,
			comments,
			pubdate,
			tags,
			_errors: errors,
			_isDirty,
		} = item;

		const inEditMode = _isDirty ? true : false;

		const link = `/${uri}`;
		
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

		const CompanyLink = `${CompanyUri}`;



		const {
			id: author_id,
			fullname,
			username,
			imageFormats: author_imageFormats,
		} = Author || {};


		let content;


		// if(inEditMode){

		// 	content =	<Editor 
		// 		value={topicContent || ""}
		// 		readOnly={!inEditMode}
		// 		name="content"
		// 		label={inEditMode ? "Содержимое публикации" : undefined}
		// 		error={errors && errors.content ? true : false}
		// 		helperText={errors && errors.content || ""}
		// 		onChange={this.onChange}
		// 		onFocus={() => this.onFocus('content')}
		// 	/>

		// }
		// else if(open){

		// 	// content = <div dangerouslySetInnerHTML={{__html: topicContent}}></div>;
		// 	content = <div dangerouslySetInnerHTML={{__html: topicContent}}></div>;

		// }
		// else{

		// 	content = <div>

		// 		<span dangerouslySetInnerHTML={{__html: short_text || summary}} />

		// 		{/*<Editor 
		// 			value={short_text || summary || topicContent || ""}
		// 		/>*/}

		// 		{short_text != topicContent 
		// 			? 
		// 			<IconButton 
		// 				onClick={() => {
		// 					this.setState({
		// 						open: true,
		// 					});
		// 				}}
		// 			>
		// 				<MoreIcon
		// 				/>
		// 			</IconButton>
		// 			:
		// 			null
		// 		}

		// 	</div>;

		// }


		content = <Editor 
			item={item}
			onChange={::this.onChange}
			readOnly={!inEditMode}
		/>

		return <Card
			style={{
				margin: "30px 0",
			}}
		>

			<CardHeader
				title={<Typography
					type="subheading"
				>
					<Grid
						container
						gutter={0}
						align="center"
					>

						<Grid
							item
							xs
						>
							{inEditMode
		        		?
									<TextField 
										label="Название публикации"
										error={errors && errors.pagetitle ? true : false}
										helperText={errors && errors.pagetitle || ""}
										name="pagetitle"
										value={pagetitle || ""}
										onChange={this.onChange}
										onFocus={() => this.onFocus('pagetitle')}
									/>
		        		:
		        		<Link
									to={link}
									href={link}
								> 
									{topicName} 
								</Link>
		        	}
							
						</Grid>

						{_isDirty
							?
							<Grid
	      				item
	      			>
	      				
	      				<IconButton
	        				onClick={event => {
	        					this.saveItem();
	        				}}
	        			>
	        				<SaveIcon 
	        					color="red"
	        				/>
	        			</IconButton>

	      			</Grid>
							:
							null
							/*<Grid
								item
							>

	      				{!serverMode && <IconButton
	        				onClick={event => {
	        					// item.update({});



	        					this.updateItem(item, {
	        					});

	        				}}
	        			>
	        				<EditIcon 
	        					// color="red"
	        				/>
	        			</IconButton> || null }
	        				
							</Grid>*/
						}

						
					</Grid>
				</Typography>}
        subheader={CompanyLink && <Link
        	to={CompanyLink}
        	href={CompanyLink}
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
						style={{
							paddingRight: 6,
						}}
					>

						<UserLink 
							user={Author}
						/> 
						
					</Grid>

					<Grid
						item
					> | <span
							style={{
								// paddingLeft: 10,
								paddingRight:6,
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
						> | <Link
							to={link}
							href={link}
							className="flex align-center"
							onClick={event => {
								event.preventDefault();
								event.stopPropagation();
								this.setState({
									commentOpen: !commentOpen,
								});
							}}
						>
							<IconButton 
								accent={comments && comments.length && !commentOpen ? true : false}
								className="flex align-center"
								style={{
									height: 34,
									width: 34,
								}}
							>
								<CommentsIcon 
									style={{
										height: 18,
										width: 18,
										// marginLeft: 10,
										marginRight: 3,
									}}
								/>
							</IconButton> <span
								style={{
									marginLeft: -5,
								}}
							>
								{comments && comments.length || 0}
							</span>
						</Link>
						
						</Grid>

					</Grid>


					{tags && tags.length
						?
						<Grid
							item
							xs={12}
							style={{
								marginTop: 10,
							}}
						>
							<Grid
								container
							>
								{tags.map(tag => {

									return <Chip
										key={tag}
										label={<Link
											to={`/tag/${tag}`}
											href={`/tag/${tag}`}
										>
											{tag}
										</Link>}
										style={{
											margin: 3,
											height: 24,
											paddingLeft: 9,
											paddingRight: 9,
										}}
									/>

								})}
							</Grid>
						</Grid>
						:
						null
					}


				</Grid>

			{commentOpen 
				?
				<Comments 
					comments={comments}
					resource={item}
					newCommentForm={true}
				/>
				:
				null
			}

			</CardContent>

		</Card>;

	}
}
