
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

import OfferForm from './OfferForm';

export default class CrmUserData extends Component{

	static propTypes = {
		user: PropTypes.object.isRequired,
	};

	static contextTypes = {
		user: PropTypes.object.isRequired,
		localQuery: PropTypes.func.isRequired,
		remoteQuery: PropTypes.func.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			offerFormOpen: false,
		};
	}


	componentDidMount(){


		this.loadData();
	}


	loadData(){

	}


	// Показываем форму отправки компреда
	showSendOfferForm(){

		this.setState({
			offerFormOpen: true,
		});

	}


	render(){

		const {
			user,
		} = this.props;

		const {
			user: currentUser,
		} = this.context;

		if(!user || !currentUser){
			return null;
		}

		
		const {
			offerFormOpen,
		} = this.state;


		let actions = [];

		actions.push(<Button 
			key="offer"
			onClick={::this.showSendOfferForm}
		>
			Отправить коммерческое предложение
		</Button>);

		return <div>

			<div>
				{actions}
			</div>

			{offerFormOpen && <OfferForm 
				user={user}
				onSuccess={() => {
					this.setState({
						offerFormOpen: false,
					});
				}}
			/> || null}

			CrmUserDatafdgfdg
		</div>
	}
}
