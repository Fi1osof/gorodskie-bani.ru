
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Page from '../../layout';

import Paper from 'material-ui/Paper';

export default class ContactsPage extends Page{



  setPageTitle(title){

		return super.setPageTitle(title || "Контакты");

  }

	renderContent(){

		return <Paper
			style={{
				margin: "30px 0",
				padding: 15,
				width: "100%",
			}}
		>
			<h4>
				
				По всем вопросам обращайтесь на почту <a href="mailto:info@gorodskie-bani.ru">info@gorodskie-bani.ru</a>
				
			</h4>
		</Paper>
	}
}
