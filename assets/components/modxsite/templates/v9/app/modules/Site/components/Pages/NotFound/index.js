import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Page from '../layout'; 

import {Link, browserHistory} from 'react-router';

export default class TopicsPage extends Page{


	constructor(props){

		super(props);

		Object.assign(this.state, {
		});
	}
	
	render(){

		return <div>
			Страница не найдена. Вернуться <a href="javascript:;" onClick={event => browserHistory.goBack()}>назад</a> или <Link to="/" href="/">на главную</Link>.
		</div>
	}
}

