import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Company from './Company';

export default class CompaniesPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
	
	renderContent(){

		const {
			params,
		} = this.props,
		{
			CompaniesStore,
		} = this.context;

		const {
			companyId,
		} = params || {};

		let item;
		let company;

		if(companyId){
			item = CompaniesStore.getState().find(n => n.id == companyId || n.alias == companyId);

			if(item){

				company = <Company
					item={item}
				/>

			}
		}

		// console.log('CompaniesPage 2 item', item, companyId);

		return <div
			style={{
				width: "100%",
			}}
		>

			{company}

		</div>
	}
}

