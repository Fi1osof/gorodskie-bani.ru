
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Page from '../../layout';

export default class ContactsPage extends Page{


	renderContent(){

		return <div
			style={{
				margin: "30px 0",
			}}
		>
			<h4>
				
				По всем вопросам обращайтесь на почту <a href="mailto:info@gorodskie-bani.ru">info@gorodskie-bani.ru</a>
				
			</h4>
		</div>
	}
}
