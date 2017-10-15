
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default class Compred extends Component{

	static propTypes = {

	};

	static contextTypes = {
		documentActions: PropTypes.object.isRequired,
		loadApiData: PropTypes.func.isRequired,
		request: PropTypes.func.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			username: "",
			fullname: "",
			email: "",
			errors: {},
			inRequest: false,
		};
	}


	onChange = event => {

		const {
			name,
			value,
		} = event.target;

		let newState = {};

		newState[name] = value;

		this.setState(newState);

	}

	submit = event => {

		const {
			username,
			fullname,
			email,
		} = this.state;

		const {
			request,
		} = this.context;

		this.setState({
			inRequest: true,
		});

		request("registration", false, 'registration', {
			username,
			fullname,
			email,
			isOffer: true,
		}, {
			callback: (data, errors) => {

				let newState = {
					inRequest: false,
					errors: {},
				};

				const {
					success,
					message,
					object,
				} = data;

				if(success){

					const {
						documentActions,
						loadApiData,
					} = this.context;

					documentActions.addInformerMessage({
						type: "success",
						text: message,
						autohide: 4000,
					});

					Object.assign(newState, {
						username: "",
						fullname: "",
						email: "",
					});

					loadApiData();

				}
				else{
					newState.errors = errors;
				}

				this.setState(newState);

			},
		});

	}


	render(){

		const {
			username,
			fullname,
			email,
			errors,
			inRequest,
		} = this.state;

		return <Grid
			container
		>
			
			<Grid 
				item
				xs={12}
				md={4}
			>

				<TextField
					name="username"
					value={username}
					onChange={this.onChange}
					label="Логин пользователя"
					error={errors && errors.username ? true : false}
					helperText={errors && errors.username || ""}
				/>

				<TextField
					name="fullname"
					value={fullname}
					onChange={this.onChange}
					label="ФИО пользователя"
					error={errors && errors.fullname ? true : false}
					helperText={errors && errors.fullname || ""}
				/>

				<TextField
					name="email"
					value={email}
					onChange={this.onChange}
					label="Емейл"
					error={errors && errors.email ? true : false}
					helperText={errors && errors.email || ""}
				/>

				<Button
					raised
					onClick={this.submit}
					disabled={inRequest}
				>
					Отправить
				</Button>

			</Grid>

		</Grid>
	}
}
