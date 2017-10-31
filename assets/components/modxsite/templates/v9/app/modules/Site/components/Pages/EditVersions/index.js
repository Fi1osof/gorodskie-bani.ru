
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Page from '../layout';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import AcceptedIcon from 'material-ui-icons/Check';
import RejectedIcon from 'material-ui-icons/Clear';

import {Link} from 'react-router';

import moment from 'moment';

import UserLink from 'modules/Site/components/fields/User/link.js';

export default class EditVersionsPage extends Page{



  // setPageTitle(title){

		// return super.setPageTitle(title || "Контакты");

  // }


  // componentWillMount(){

		// const {
		// 	EditVersionsStore,
		// } = this.context;



		// // EditVersionsStore.getState().map(n => {

		// // 	// tbody.push();

		// // });

		// // this.setState({
		// // 	items: EditVersionsStore.getState(),
		// // 	// items: EditVersionsStore.getState().toArray(),
		// // });


  // 	super.componentWillMount && super.componentWillMount();

  // }


  loadData(){

		const {
			localQuery,
		} = this.context;

		const {
			companyId,
		} = this.props;


		localQuery({
			operationName: "editVersions",
			variables: {
				editVersionLimit: 0,
				editVersionGetEditor: true,
				editVersionGetCompany: true,
				getImageFormats: true,
				editVersionCompanyId: companyId,
			},
		})
		.then(r => {

			const {
				editVersions,
			} = r.data;

			this.setState({
				items: editVersions || [],
			});

		})
		.catch(e => {
			console.error(e);
		});


		// // EditVersionsStore.getState().map(n => {

		// // 	// tbody.push();

		// // });

		// this.setState({
		// 	items: EditVersionsStore.getState(),
		// 	// items: EditVersionsStore.getState().toArray(),
		// });

		// this.state.items = EditVersionsStore.getState();

		// try{

		// 	console.log('EditVersionsStore.getState()', EditVersionsStore.getState());

		// }
		// catch(e){
		// 	console.error(e);
		// }


  	super.loadData && super.loadData();
  }


  triggerGoal(goal){

    const {
      triggerGoal,
    } = this.context;

    triggerGoal(goal);

  }


	renderContent(){

		const {
			user: {
				user: currentUser,
				hasPermission,
			},
		} = this.context;

		const {
			companyId,
			previewDiffs,
			diffs,
		} = this.props;


		const sudo = hasPermission("sudo");

		// console.log("hasPermission", sudo);

		const companyView = companyId ? true : false;

		// try{

		// 	// console.log('EditVersionsStore.getState()', EditVersionsStore.getState());

		// 	EditVersionsStore.getState().map(n => {
		// 		console.log("EditVersionsStore.getState() item", n);
		// 	});

		// 	// console.log('RatingsStore.getState()', RatingsStore.getState());

		// 	// RatingsStore.getState().map(n => {
		// 	// 	console.log("RatingsStore.getState() item", n);
		// 	// });

		// }
		// catch(e){
		// 	console.error(e);
		// }

		const {
			items,
		} = this.state;


		let thead = [

			<TableCell
				key="editedon"
			>
				Дата
			</TableCell>,

			<TableCell
				key="status"
			>
				Статус
			</TableCell>,

			<TableCell
				key="editedby"
			>
				Автор изменений
			</TableCell>,

		];


		if(!companyView){
			thead.unshift(<TableCell
				key="building"
			>
				Заведение
			</TableCell>);
		}


		if(companyView){
			thead.push(<TableCell
				key="actions"
			>
				Действие
			</TableCell>);
		}

		if(sudo){
			thead.push(<TableCell
				key="data"
			>
				Данные
			</TableCell>);
		}

		let tbody = [];

		// console.log('items', items);


		items && items.map(item => {

			const {
				id,
				editedon,
				status,
				data,
				EditedBy,
				Company,
			} = item;

			let jsonData;

			if(sudo){

				jsonData = JSON.stringify(data);

			}

			const {
				id: company_id,
				name: company_name,
				uri: company_uri,
			} = Company || {};

			let actions = [];

			actions.push(<Button
				key="view"
				onClick={event => {

					this.triggerGoal("companyEditDiffsClicked");

					previewDiffs && previewDiffs(item);
				}}
				accent={diffs === item ? true : false}
				style={{
					textTransform: "none",
				}}
			>
				{diffs === item ? "Отменить изменения" : "Посмотреть изменения"}				
			</Button>);

			let statusStr;

			switch(status){

				case '0':

					statusStr = "Новый";

					break;

				case '1':

					statusStr = <span
						className="flex align-center"
					>
						
						<AcceptedIcon 
							color="green"
						/> Одобрен

					</span>;


					break;

				case '2':

					statusStr = <span
						className="flex align-center"
					>
						
						<RejectedIcon 
							color="red"
						/> Отменен

					</span>;

					break;

				default: statusStr = status;

			}

			tbody.push(<TableRow
				key={id}
			>
				
				{!companyView
					?
					<TableCell>

						{company_id 
							?

								<Link
									to={company_uri}
									href={company_uri}
								>
									{company_name}
								</Link>

							:
							""
						}

					</TableCell>
					:
					null
				}
				
				<TableCell>
					{editedon && moment(editedon * 1000).format('DD-MM-YYYY HH:mm:ss') || ''}
				</TableCell>
				
				<TableCell>
					{statusStr}
				</TableCell>
				
				<TableCell>
					{EditedBy && <UserLink 
						user={EditedBy}
					/> || "Анонимный пользователь"}
				</TableCell>
				
				{companyView 
					? 
					<TableCell>
						{actions}
					</TableCell>
					:
					null
				}
				
				{sudo 
					? 
					<TableCell
						style={{
							whiteSpace: "pre-wrap",
						}}
					>
						{jsonData || ""}
					</TableCell>
					:
					null
				}

			</TableRow>);



		});


		return <Paper
			style={{
				margin: "30px 0",
				padding: 15,
				width: "100%",
				overflow: "auto",
			}}
		>
			<Table>
				
				<TableHead>
					
					<TableRow>
						
						{thead}

					</TableRow>

				</TableHead>

				<TableBody>
					
					{tbody}

				</TableBody>

			</Table>
		</Paper>
	}
}
