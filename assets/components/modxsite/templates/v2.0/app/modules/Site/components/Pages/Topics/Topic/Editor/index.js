
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Editor from 'modules/Site/components/Editor';

import Typography from 'material-ui/Typography';

export default class TopicEditor extends Component{


	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	
	static propTypes = {

	};

	
	static contextTypes = {

	};


	constructor(props){

		super(props);

		this.state = {

		};
	}


	componentWillMount(){
	
	}


	componentDidMount(){

	}


	onFocus(event, data){

		const {
			item,
			onFocus,
			onChange,
			readOnly,
		} = this.props;

		if(readOnly){
			return;
		}


		if(!item){
			return;
		}


		let {
			_errors,
		} = item;


		_errors = Object.assign(_errors || {}, {
			content: null,
			editor_content: null,
		});

		onChange({
			target: {
				_errors,
			}
		});

		onFocus && onFocus({
			name: "editor_content",
			value: _errors,
		});

	}

	
	render(){

		let {
			item,
			onFocus,
			...other
		} = this.props;


		if(!item){
			return null;
		}

		const {
			id,
			// content:topicContent,
			editor_content,
			_errors: errors,
			_Dirty,
		} = item;

		const {
			content: contentError,
		} = errors || {};

		return <div>
			
			{contentError && <Typography 
				type="subheading"
				style={{
					color: "red",
				}}
			>
				{contentError}
			</Typography> || null}

			<Editor
				{...other}
				name="editor_content"
				value={editor_content}
				onFocus={::this.onFocus}
			/>

		</div>
	}
}
