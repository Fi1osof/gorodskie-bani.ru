import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

const defaultProps = {}

export default class Page extends Component{

	static contextTypes = {
		CompaniesStore: PropTypes.object.isRequired,
		TopicsStore: PropTypes.object.isRequired,
		getCounters: PropTypes.func.isRequired,
		localQuery: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

  componentDidUpdate(){

    if(this.props.debug){
      console.log("Page componentDidUpdate", this);
    }
  }

  getContent(){

  	return null;
  }

  findResource(resources, pathname){
  	let resource;

  	resources.map(r => {
  		if(resource){
  			return;
  		}

  		if(r.link == pathname){
  			resource = r;
  		}
  		else if(r.childs){
  			resource = this.findResource(r.childs, pathname);
  		}

			// return resource.link == pathname || (resource.childs && resource.childs.find(c => c.link == pathname));
		})

  	return resource;
  }

	render(){

		const {
			getCounters,
		} = this.context;

		return <Grid
			container
			style={{
				maxWidth: 1260,
				margin: "0 auto",
			}}
		>
			
			{this.renderContent()}

			{getCounters()}

		</Grid>;
	}
}

Page.defaultProps = defaultProps;

Page.propTypes = {
}
