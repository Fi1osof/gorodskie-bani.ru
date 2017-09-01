import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

const defaultProps = {}

export default class Page extends Component{

	static contextTypes = {
		resourcesMap: PropTypes.array.isRequired,
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

		let {
			resourcesMap,
		} = this.context;

		let {
			router,
		} = this.props;

		let location = router.getCurrentLocation();

		// console.log('router', router, location);

		let {
			pathname,
		} = location || {};

		// console.log('pathname', pathname);

		// let content;

		

		let resource = this.findResource(resourcesMap, pathname);

		// console.log('resource', resource);

  	return resource && resource.content || null;
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

  getMenu(resources, parent){
  	if(!resources || !resources.length){
  		return null;
  	}

  	let items = [];

  	resources.map(resource => {

			let {
				id,
				pagetitle,
				menutitle,
				hidemenu,
				link,
				linktext,
				childs,
			} = resource;

			let children = [];

			// childs && childs.map();

			let item = <li
				key={id || `items_${items.length}`}
			>
				<Link 
					to={link}
					href={link}
				>{linktext}</Link>

				{this.getMenu(childs, id)}
			</li>

			items.push(item);
		});

  	let menu = <ul
  		key={parent}
			className="react-site--main-menu"
		>
			{items}
		</ul>;

		return menu;
  }

	render(){

		let content = this.getContent();

		let {
			resourcesMap,
		} = this.context;

		let menu = this.getMenu(resourcesMap, 0);


		return <Grid
			container
		>
			
			<Grid
				item
			> 
				{menu}
 
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
