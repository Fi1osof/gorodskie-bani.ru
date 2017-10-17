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
	

	setPageTitle(title){

		const {
			params,
		} = this.props;

		const {
			companyId,
		} = params || {};

		return !companyId && super.setPageTitle(title || "Городские бани");
	}

	renderContent(){

		const {
			router,
		} = this.context;

		const {
			params,
		} = this.props;

		const {
			CompaniesStore,
		} = this.context;

		const {
			companyId,
		} = params || {};

		let item;
		let company;

		if(companyId){

			// let location = browserHistory && browserHistory.getCurrentLocation();

			let pathname = router.location.pathname;

			pathname = decodeURI(pathname);

			pathname = pathname.replace(/^\//, '');

			// console.log('location pathname', pathname);

			// console.log('location companyId', companyId);

			// item = CompaniesStore.getState().find(n => n.uri === pathname || n.id == companyId || n.alias == companyId);
			item = CompaniesStore.getState().find(n => n.uri === pathname || n.uri === `${pathname}/`);

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

