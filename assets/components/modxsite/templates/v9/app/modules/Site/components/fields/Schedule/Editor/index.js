
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Tabs, { Tab } from 'material-ui/Tabs';


export default class ScheduleEditorField extends Component{

	static propTypes = {

	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {
			tabIndex: 0,
		};
	};

  
  handleTabIndexChange(event, tabIndex){
    this.setState({ tabIndex });
  };


	render(){

		const {
			item,
			...other
		} = this.props;

		if(!item){
			return null;
		}

		const {
			tabIndex,
		} = this.state;

		const {
			schedule,
		} = item;



		let tabContent;



    switch(tabIndex){

    	case 0:

    		tabContent = <div>ewfew</div>;

    		break;

    }

		return <div>
				
			<Tabs 
        index={tabIndex} 
        onChange={::this.handleTabIndexChange} 
        textColor="accent"
      >
        <Tab label="Основной график" />
        <Tab label="Мужские дни" />
        <Tab label="Женские дни" />
        <Tab label="Семейные дни" />
      </Tabs>
			
			{tabContent}

		</div>;
	}
}
