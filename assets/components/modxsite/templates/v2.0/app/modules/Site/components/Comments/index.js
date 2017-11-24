
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Comment from './Comment';

import Button from 'material-ui/Button';

import AddIcon from 'material-ui-icons/Add';
import CommentIcon from 'material-ui-icons/Comment';

export default class Comments extends Component{

	static propTypes = {
		comments: PropTypes.array.isRequired,
		resource: PropTypes.object,
	};

	static contextTypes = {
		localQuery: PropTypes.func.isRequired,
		CommentsStore: PropTypes.object.isRequired,
	};


	constructor(props){

		super(props);

		this.state = {
			newComment: null,
		};
	}


	addComment(){

		const {
			localQuery,
			CommentsStore,
		} = this.context;

		const {
			resource,
		} = this.props;

		if(!resource){
			throw("Не был получен объект документа");
		}

		const {
			id: commentTargetId,
		} = resource;

		localQuery({
			operationName: "addComment",
			variables: {
				commentTargetId,
			},
		})
		.then(r => {


			const {
				addComment,
			} = r.data;

			if(addComment){

				let comment = CommentsStore.getState().find(n => n.id === addComment.id);

				Object.assign(comment, addComment);

				this.setState({
					newComment: comment,
				});
			}


		})
		.catch(e => {
			console.error(e);
		});

	}


	render(){

		const {
			comments,
			newCommentForm,
		} = this.props;

		const {
			newComment,
		} = this.state;

		if(!comments){
			return null;
		}

		let commentsList = [];

		comments.map(comment => {
			commentsList.push(<Comment
				key={comment.id || `comment_${commentsList.length}`}
				item={comment}
			/>);
		});

		return <div>
			{commentsList}

			{newCommentForm
				?
				<div
					style={{
						marginTop: 30,
					}}
				>

					{newComment
						?
						<Comment 
							item={newComment}
							onSuccess={r => {
								this.setState({
									newComment: null,
								});
							}}
						/>
						:
						<Button
							style={{
								textTransform: "none",
							}}
							onClick={::this.addComment}
						>
							<CommentIcon />	Написать комментарий
						</Button>
					}

				</div>
				:
				null
			}

		</div>
	}
}
