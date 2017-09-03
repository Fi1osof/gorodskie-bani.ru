import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

const defaultProps = {}

export default class Page extends Component{

	static contextTypes = {
		companiesStore: PropTypes.object.isRequired,
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

		let content = this.getContent();


		return <Grid
			container
		>
			
			<Grid
				item
			> 
 
			</Grid>

			<Grid
				item
				xs
			> 
				{content && <div dangerouslySetInnerHTML={{__html: content}}></div>} 
			</Grid>

		</Grid>;
	}
}

Page.defaultProps = defaultProps;

Page.propTypes = {
}
