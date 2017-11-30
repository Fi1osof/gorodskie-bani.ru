
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

export default class CitiesList extends Component{

	static propTypes = {
		cities: PropTypes.array.isRequired,
	};

	static contextTypes = {
		coords: PropTypes.object.isRequired,
		setCoords: PropTypes.func.isRequired,
		localQuery: PropTypes.func.isRequired,
		ResourcesStore: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		const {
			cities,
		} = props;

		this.state = {
			open: false,
			cities,
			order: "coords",	// coors || name
		};
	}


	componentDidMount(){


    const {
      ResourcesStore,
    } = this.context;

    this.ResourcesStoreListener = ResourcesStore.getDispatcher().register(() => {
    	this.loadData();
    });


		// this.loadData();

		super.componentDidMount && super.componentDidMount();

	}


	componentWillUnmount(){

    const {
      ResourcesStore,
    } = this.context;


    if(this.ResourcesStoreListener){

      let dispatch = ResourcesStore.getDispatcher();

      dispatch._callbacks[this.ResourcesStoreListener] && dispatch.unregister(this.ResourcesStoreListener);

      this.ResourcesStoreListener = undefined;
    }


	}


  componentDidUpdate(prevProps, prevState, prevContext){



    const {
      coords,
    } = this.context;

    const {
      coords: prevCoords,
    } = prevContext;

    if(
      (coords || prevCoords)
      && JSON.stringify(coords || "") != JSON.stringify(prevCoords || "")
    ){

      this.loadData();
    }

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);

  }


  loadData(){

    const {
      localQuery,
      coords,
    } = this.context;

    const {
    	order,
    } = this.state;

    const sort = order === "name" ? {
    	by: "name",
    	dir: "asc",
    } : undefined;

    localQuery({
      operationName: "Cities",
      variables: {
        limit: 0,
        resourcesCenter: coords,
        citiesSort: sort,
      },
    })
    .then(r => {

      const {
        resources: cities,
      } = r.data;



      this.setState({
        cities,
      });

    })
    .catch(e => {
      console.error(e);
    });

  }


  // changeCity(city){



  // 	const {
  // 		setCoords,
  // 	} = this.context;

  // 	const {
  // 		lat,
  // 		lng,
  // 	} = city.coords || {};

  // 	setCoords({
  // 		lat,
  // 		lng,
  // 		zoom: 12,
  // 	});

  // 	this.setState({
  // 		open: false,
  // 	});

  // 	this.loadData();

  // }


	render(){

		const {
			cities,
			open,
			order,
		} = this.state;

		if(!cities || !cities.length){
			return null;
		}


		const {
			coords,
		} = this.context;


		let base_url = '/';


		let coordsUrl;

    if(coords){

      const {
        lat,
        lng,
        zoom,
      } = coords;

      if(lat && lng && zoom){

        // base_url += "@" + [lat, lng, zoom].join(",");
        coordsUrl = "@" + [lat, lng, zoom].join(",");

      }

    }


		let currentCity;

		let citiesList = [];

		cities.map((city, index) => {

			const {
				id,
				name,
				uri,
			} = city;

			if(index === 0){
				currentCity = city;

				const {
					id,
					uri,
				} = currentCity;

				base_url = `/${uri}${coordsUrl}`;

			}
			// else{

				citiesList.push(<Grid
					key={id}
					item

					xs={6}
					sm={4}
					md={3}
					lg={2}
				>
					<Link
						to={`/${uri}`}
						href={`/${uri}`}
						onClick={() => {
							// this.changeCity(city);
					  	this.setState({
					  		open: false,
					  	});
						}}
					>
						<Chip 
							label={name}
							style={{
								// padding: 0,
								height: 24,
								marginRight: 5,
								marginBottom: 5,
							}}
						/>
					</Link>
				</Grid>);

			// }

		});

		return <div
		>

			<Typography
				type="subheading"
				className="text default"
				// style={{
				// 	paddingBottom: 20,
				// }}
			>
				{!open 
					?
					<p>
						Данные показаны относительно города {currentCity.name}. <Link
							to={`/city/${coordsUrl}`} 
							href={`/city/${coordsUrl}`} 
							onClick={(event) => {

								event.preventDefault();
								event.stopPropagation();

								this.setState({open: !open});
							}}
						>
							Выбрать город
						</Link> или <Link
							to={base_url}
							href={base_url}
						>Смотреть на карте</Link>
						<br />
						Подсказка: если на карте Вы сдвигаете центр карты, заведения в списке будут сортироваться относительно измененного положения, 
						то есть сначала будут выводиться ближайшие к Вам.
					</p>
					:
					<div>
						<p>
							Выберите ближайший к Вам город. Все данные на сайте будут выстраиваться относительно этого города. <a 
								href="javascript:;" 
								onClick={() => this.setState({open: !open})}
							>
								Отмена
							</a>
						</p>
						{order === "name" 
							?
							<p>
								Города упорядочены по названию. <a 
									href="javascript:;"
									onClick={event => {
										this.setState({
											order: "coords",
										}, () => this.loadData());
									}}
								>Упорядочить по расстоянию</a>
							</p>
							:
							<p>
								Города упорядочены по расстоянию от города {currentCity.name}. <a 
									href="javascript:;"
									onClick={event => {
										this.setState({
											order: "name",
										}, () => this.loadData());
									}}
								>Упорядочить по названию</a>
							</p>
						}
					</div>
				}
			</Typography>

			{open
				?
					<Grid
						container
						gutter={0}
						// style={{
					 //    display: 'flex',
					 //    justifyContent: 'flex-starts',
					 //    flexWrap: 'wrap',
					 //  }}
					>
						
						{citiesList}

					</Grid>
				:
				null
			}


		</div>
	}
}
