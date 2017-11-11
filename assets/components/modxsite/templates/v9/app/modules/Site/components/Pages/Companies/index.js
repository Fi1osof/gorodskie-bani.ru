import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Company from './Company';

import CompaniesList from './List';

export default class CompaniesPage extends Page {


	constructor(props){

		super(props);

		Object.assign(this.state, {
			companies: undefined,
		});

	}
	

	setPageTitle(title){

		// console.log("setPageTitle", title);

		const {
			params,
		} = this.props;

		const {
			companyId,
		} = params || {};

		return !companyId && super.setPageTitle(title || "Городские бани");
	}


	componentWillMount(){

		let {
			CompaniesStore,
			document,
			appExports,
			router,
		} = this.context;

		let pathname = router.location && router.location.pathname;


		const companyId = this.getCompanyId();

		if(typeof window === "undefined"){

			let outputState = CompaniesStore.getState();

			// console.log('outputState', outputState.toArray());
			
			if(companyId && pathname && outputState){

				pathname = decodeURI(pathname);

				pathname = pathname.replace(/^\//, '');
				
				outputState = outputState.filter(n => n.uri === pathname || n.uri === `${pathname}/`);

				appExports.outputState = outputState && outputState.toArray();

			}

		}
		else{
				
			this.state.inputState = document.inputState;

			console.log('document.inputState', document.inputState);

		}


		super.componentWillMount && super.componentWillMount();

	}

	
	loadData(){

		const {
			localQuery,
		} = this.context;

		const page = this.getPage();

		localQuery({
			operationName: "MapCompanies",
			variables: {
				limit: 12,
				withPagination: true,
				page,
			},
		})
		.then(r => {
			console.log("Companies result", r);
			// console.log("Companies result 2", companies);

			const {
				companiesList: companies,
			} = r.data;

			this.setState({
				companies,
			});
		})
		.catch(e => {
			console.error(e);
		});

	}


	triggerGoal(goal){

		const {
			triggerGoal,
		} = this.context;

		triggerGoal(goal);

	}


	getCompanyId(){

		const {
			router,
		} = this.context;

		const {
			params,
		} = this.props;

		const {
			companyId,
		} = params || {};

		return companyId;

	}


	renderContent(){

		const {
			router,
			CompaniesStore,
		} = this.context;

		const {
			inputState,
			companies,		// Для списка компаний именно это свойство используется
		} = this.state;

		let item;
		let content;

		const companyId = this.getCompanyId();

		/*
			Если указан ID компании, то выводим компанию.
			Иначе выводим список компаний
		*/
		if(companyId){

			// let location = browserHistory && browserHistory.getCurrentLocation();

			let pathname = router.location.pathname;

			pathname = decodeURI(pathname);

			pathname = pathname.replace(/^\//, '');

			// console.log('location pathname', pathname);

			// console.log('location companyId', companyId);

			// item = CompaniesStore.getState().find(n => n.uri === pathname || n.id == companyId || n.alias == companyId);



			item = CompaniesStore.getState().find(n => n.uri === pathname || n.uri === `${pathname}/`);

			// Если не был найден документ в общем хранилище, ищем во входящем стейте
			if(!item){
				
				item = inputState && inputState.find(n => n.uri === pathname || n.uri === `${pathname}/`);

			}

			if(item){

			}
			else{

				let id = parseInt(companyId);


				if(id){

					item = CompaniesStore.getState().find(n => n.id  === id);


					// Если это временный объект, то выводим сообщение об ошибке
					if(!item && id < 0){
						
						content = <Paper
							style={{
								padding: 15,
							}}
						>

							Ссылка на редактируемый документ устарела.
							Если вы обновляли страницу и не сохранили документ, он удалился и необходимо <a href="javascript:;" onClick={e => {

	    					const {
	    						localQuery,
	    					} = this.context;

	    					localQuery({
	    						operationName: "addCompany",
	    					});

	    					this.triggerGoal('addCompanyClick');

	    				}}>создать новый</a>.
							
						</Paper>

					}

				}

				// console.log("id", id, item);

			}

			if(item){

				content = <Company
					item={item}
				/>

			}
		}
		else{

			if(companies === undefined){
				content = <div
					style={{
						height: "100vh",
					}}
				>
					<div 
            className="preloader"
          />
         </div>
			}
			else{

				content = <CompaniesList 
					data={companies}
				/>

			}


		}

		// console.log('CompaniesPage 2 item', item, companyId);

		return <div
			style={{
				width: "100%",
				marginTop: 20,
				// border: "1px solid",
			}}
		>

			{content}

		</div>
	}
}

