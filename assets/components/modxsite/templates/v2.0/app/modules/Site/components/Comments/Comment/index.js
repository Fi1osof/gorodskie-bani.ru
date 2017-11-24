
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import UserAvatar from 'modules/Site/components/fields/User/avatar';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import moment from 'moment';

// import Editor from 'modules/Site/components/fields/Editor';
import Editor from './Editor';

// window.moment = moment;

export default class Comment extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
		showResourceLink: PropTypes.bool.isRequired,
	};

	static contextTypes = {
		updateCommentItem: PropTypes.func.isRequired,
		saveCommentItem: PropTypes.func.isRequired,
	};

	static defaultProps = {
		showResourceLink: false,
	};

	constructor(props){

		super(props);

		this.state = {
			sending: false,
		};
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

		// this.clearErrors(name);

		data[name] = value;




		this.updateItem(item, data);

	}


	updateItem(item, data, silent){

		const {
			updateCommentItem,
		} = this.context;

		return updateCommentItem(item, data, silent);

	}

	async saveItem(){

		const {
			saveCommentItem,
		} = this.context;

		const {
			item,
		} = this.props;

		this.setState({
			sending: true,
		});



		await saveCommentItem(item)
			.then(r => {
				
				const {
					onSuccess,
				} = this.props;

				onSuccess && onSuccess(r);

			})
			.catch(e => {
				console.error(e);
			});



		this.setState({
			sending: false,
		});

	}

	// Почему-то не приходит объект события
	onFocus = (name) => {



		this.clearErrors(name);

		return;

	}


	render(){

		const {
			item,
			showResourceLink,
		} = this.props;

		if(!item){
			return null;
		}

		const {
			sending,
		} = this.state;

		const {
			id,
			text,
			parent,
      createdon,
      Author,
			Resource,
			_errors: errors,
			_Dirty,
		} = item;

		const inEditMode = _Dirty ? true : false;

		const {
      username,
      fullname,
      imageFormats,
		} = Author || {};


		let footer;

		if(showResourceLink && Resource){

			const {
				id: resourceId,
				uri: resourceUri,
				name: resourceName,
			} = Resource;

			footer = <CardContent>
				<Link
					to={resourceUri}
					href={resourceUri}
					title={resourceName}
				>
					{resourceName}
				</Link>
			</CardContent>

		}


		return <Card
			style={{
				marginTop: 15,
				marginBottom: 15,
			}}
		>
			
			<CardHeader
        avatar={
          <Link
          	to={`/profile/${username}`}
          	href={`/profile/${username}`}
          >
          	<UserAvatar 
	          	user={Author}
	          />
          </Link>
        }
        title={<Link
        	to={`/profile/${username}`}
        	href={`/profile/${username}`}
        >
        	{fullname || username || undefined}
        </Link>}
        subheader={createdon && id && <Link
        	to={`/comments/comment-${id}.html`}
        	href={`/comments/comment-${id}.html`}
        	className="no-underline"
        >{createdon}</Link> || undefined}
      />

			<CardContent>
						
				<Editor 
					value={text || ""}
					readOnly={!inEditMode}
					name="text"
					item={item}
					// label={inEditMode ? "Текст комментария" : undefined}
					// error={errors && errors.text ? true : false}
					// helperText={errors && errors.text || ""}
					onChange={this.onChange}
					// onFocus={() => this.onFocus('text')}
				/>

				{inEditMode
					?
					<div>

						<Button
							raised
							style={{
								fontSize: "14px",
						    textTransform: "none",
						    padding: 0,
						    margin: 0,
						    height: 26,
						    marginTop: 10,
							}}
      				onClick={event => {
      					this.saveItem();
      				}}
      				disabled={sending}
						>
							Отправить
						</Button>

					</div>
					:
					null
				}
			</CardContent>

			{footer}

		</Card>
	}
}
