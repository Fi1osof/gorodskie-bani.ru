
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import {Link} from 'react-router';

export default class CitiesList extends Component{

	static propTypes = {

	};

	static contextTypes = {
		coords: PropTypes.object.isRequired,
		setCoords: PropTypes.func.isRequired,
		localQuery: PropTypes.func.isRequired,
		ResourcesStore: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			open: false,
		};
	}


	componentDidMount(){


    const {
      ResourcesStore,
    } = this.context;

    this.ResourcesStoreListener = ResourcesStore.getDispatcher().register(() => {
    	this.loadData();
    });


		this.loadData();

		super.componentDidMount && super.componentDidMount();

	}


  componentDidUpdate(prevProps, prevState, prevContext){

    // console.log("MainMenu componentDidUpdate", this.context.coords, prevContext.coords);

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
      // console.log("componentDidUpdate loadDatasss");
      this.loadData();
    }

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);

  }


  loadData(){

    const {
      localQuery,
      coords,
    } = this.context;

    localQuery({
      operationName: "Cities",
      variables: {
        limit: 0,
        resourcesCenter: coords,
      },
    })
    .then(r => {

      const {
        resources: cities,
      } = r.data;

      // console.log("Cities loadData cities", coords, r.data);

      this.setState({
        cities,
      });

    })
    .catch(e => {
      console.error(e);
    });

  }


  changeCity(city){

  	// console.log("ChangeCity", city);

  	const {
  		setCoords,
  	} = this.context;

  	const {
  		lat,
  		lng,
  	} = city.coords || {};

  	setCoords({
  		lat,
  		lng,
  		zoom: 12,
  	});

  	this.setState({
  		open: false,
  	});

  	this.loadData();

  }


	render(){

		const {
			cities,
			open,
		} = this.state;

		if(!cities || !cities.length){
			return null;
		}


		const {
			coords,
		} = this.context;


		let base_url = '/';


    if(coords){

      const {
        lat,
        lng,
        zoom,
      } = coords;

      if(lat && lng && zoom){

        base_url += "@" + [lat, lng, zoom].join(",");

      }

    }


		let currentCity;

		let citiesList = [];

		cities.map((city, index) => {

			const {
				id,
				name,
			} = city;

			if(index === 0){
				currentCity = city;
			}
			else{

				citiesList.push(<Chip 
					key={id}
					label={name}
					style={{
						// padding: 0,
						height: 20,
						marginRight: 5,
						marginBottom: 5,
					}}
					onClick={() => {
						this.changeCity(city);
					}}
				/>);

			}

		});

		return <div
		>

			<Typography
				type="subheading"
				className="text default"
				style={{
					paddingBottom: 20,
				}}
			>
				{!open 
					?
					<span>
						Данные показаны относительно города {currentCity.name}. <a 
							href="javascript:;" 
							onClick={() => this.setState({open: !open})}
						>
							Изменить
						</a> или <Link
							to={base_url}
							href={base_url}
						>Смотреть на карте</Link>
						<br />
						Подсказка: если на карте Вы сдвигаете центр карты, заведения в списке будут сортироваться относительно измененного положения, 
						то есть сначала будут выводиться ближайшие к Вам.
					</span>
					:
					<span>
						Выберите ближайший к Вам город. Все данные на сайте будут выстраиваться относительно этого города. <a 
							href="javascript:;" 
							onClick={() => this.setState({open: !open})}
						>
							Отмена
						</a>
					</span>
				}
			</Typography>

			{open
				?
					<div
						style={{
					    display: 'flex',
					    justifyContent: 'flex-starts',
					    flexWrap: 'wrap',
					  }}
					>
						
						{citiesList}

					</div>
				:
				null
			}


		</div>
	}
}
