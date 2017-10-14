import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

export default class MainMenu extends Component{

  static contextTypes = {
    coords: PropTypes.object.isRequired,
    CompaniesStore: PropTypes.object.isRequired,
    TopicsStore: PropTypes.object.isRequired,
    ResourcesStore: PropTypes.object.isRequired,
    CommentsStore: PropTypes.object.isRequired,
    UsersStore: PropTypes.object.isRequired,
    RatingsStore: PropTypes.object.isRequired,
    localQuery: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

	constructor(props){

		super(props);

		this.state = {
			ratingsOpened: false,
			citiesOpened: false,
		}
	}


  componentDidMount(){


    const {
      CommentsStore,
      RatingsStore,
      TopicsStore,
      ResourcesStore,
    } = this.context;

    this.CommentsStoreListener = CommentsStore.getDispatcher().register(this.onStoreUpdate);

    this.RatingsStoreListener = RatingsStore.getDispatcher().register(this.onStoreUpdate);

    this.TopicsStoreListener = TopicsStore.getDispatcher().register(this.onStoreUpdate);

    this.ResourcesStoreListener = ResourcesStore.getDispatcher().register(this.onStoreUpdate);

    this.loadData();
  }

  onStoreUpdate = payload => {

    switch(payload.type){

      case "SET_DATA":

        this.loadData();
        break;

      default:;

    }
  }


  loadData(){

    const {
      localQuery,
    } = this.context;


    localQuery({
      operationName: "MainMenuData",
      variables: {
        limit: 0,
      },
    })
    .then(r => {

      const {
        ratings,
        resources: cities,
      } = r.data;

      this.setState({
        ratings,
        cities,
      });

    });

  }

  closeMenu(){

    $('#navbar-main').removeClass("in");

  }


	render(){

    const {
      coords,
    } = this.context;

		let {
      ratings,
      cities,
			ratingsOpened,
			citiesOpened,
		} = this.state;

    let base_url = "/";

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

    let citiesList = [];

    cities && cities.map(city => {

      const {
        id,
        name,
        coords,
        alias: city_alias,
      } = city;

      if(!coords){
        return;
      }

      const {
        lat,
        lng,
      } = coords;

      const link = `/city/${city_alias}/@` + [lat,lng,12].join(",");

      citiesList.push(<li
        key={id}
      >
        <Link
          to={link}
          href={link}
          onClick={event => {
            // this.setState({
            //   citiesOpened: false,
            // });
            this.closeMenu();
          }}
        >
          {name}
        </Link>
      </li>);

    });



    let ratingsList = [];

    ratings && ratings.map(item => {

      const {
        Type
      } = item;

      if(!Type){
        return;
      }

      const {
        id,
        name,
        uri: link,
      } = Type;

      ratingsList.push(<li
        key={id}
      >
        <Link
          to={link}
          href={link}
          onClick={event => {
            // this.setState({
            //   ratingsOpened: false,
            // });
            this.closeMenu();
          }}
        >
          {name}
        </Link>
      </li>);

    });

		return <div 
      // className="navbar navbar-default"
      className="navbar navbar-default navbar-fixed-top"
      style={{
        marginBottom: 0,
      }}
    >
      <div className="container">
        <div className="navbar-header">
          <Link 
            href={base_url}
            to={base_url}
            className="navbar-brand"
          >
            <div className="logo">
              <i className="str leaf leaf-l"></i>
              <span className="str">Городские бани</span>
            </div>
          </Link>
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div> 
        
        <div id="navbar-main" className="collapse navbar-collapse navbar-right">
          <ul className="nav navbar-nav">
              <li className="first">
                <Link 
                  to="bani-otzivy/" 
                  href="bani-otzivy/" 
                  title="Обзоры и отзывы"
                  onClick={event => {
                    this.closeMenu();
                  }}
                >
                  Обзоры и отзывы 
                </Link>
              </li>
              <li className="">
                <Link 
                  to="topics/" 
                  href="topics/" 
                  title="Новости"
                  onClick={event => {
                    this.closeMenu();
                  }}
                >
                  Новости
                </Link>
              </li>
              <li>
              <a 
              	href="javascript:;" 
              	title="Рейтинги заведений" 
              	className="dropdown-toggle"
                data-toggle="dropdown"
              	// onClick={event => this.setState({
              	// 	ratingsOpened: !ratingsOpened,
              	// })}
              >Рейтинги заведений <i className="fa fa-angle-down"></i></a>
              <ul 
              	className="dropdown-menu"
              	style={{
              		display: ratingsOpened ? 'block' : undefined,
              	}}
              >
                {ratingsList}

                {/*<li className="first"><a href="ratings/steam/" title="Парилка">Парилка</a></li>
                <li><a href="ratings/service/" title="Обслуживание">Обслуживание</a></li>
                <li><a href="ratings/interior/" title="Интерьер">Интерьер</a></li>
                <li><a href="ratings/cuisine/" title="Кухня">Кухня</a></li>
                <li><a href="ratings/cleanliness/" title="Чистота">Чистота</a></li>
                <li><a href="ratings/grafik-rabotyi/" title="График работы">График работы</a></li>
                <li><a href="ratings/prices/" title="Стоимость услуг">Стоимость услуг</a></li>
                <li><a href="ratings/cuisine-prices/" title="Стоимость кухни">Стоимость кухни</a></li>
                <li><a href="ratings/skidki-i-akczii/" title="Скидки и акции">Скидки и акции</a></li>
                <li><a href="ratings/friendliness/" title="Дружественная атмосфера">Дружественная атмосфера</a></li>
                <li className="last"><a href="ratings/lgotyi-postoyannyim-posetitelyam/" title="Льготы постоянным посетителям">Льготы постоянным посетителям</a></li>*/}
              </ul>
              </li>

              <li>
              	<a 
              		href="javascript:;" 
              		title="Города" 
              		className="dropdown-toggle" 
              		data-toggle="dropdown"
	              	// onClick={event => this.setState({
	              	// 	citiesOpened: !citiesOpened,
	              	// })}
              	>Города <i className="fa fa-angle-down"></i></a>
	              <ul 
	              	className="dropdown-menu"
	              	style={{
	              		display: citiesOpened ? 'block' : undefined,
	              	}}
	              >

                  {citiesList}

	              </ul>
              </li>
              <li className="last">
                <Link 
                  to="contacts.html" 
                  href="contacts.html" 
                  title="Контакты"
                  onClick={event => {
                    this.closeMenu();
                  }}
                >
                  Контакты
                </Link>
              </li>
              
              {/*<li className="dropdown">
                  <a id="office" href="#" data-toggle="dropdown" className="dropdown-toggle"><i className="glyphicon glyphicon-user"></i><span className="caret"></span></a>
                  <ul aria-labelledby="office" className="dropdown-menu">
                      <li><a href="profile/">Профиль</a></li>
                      <li><a href="add-topic.html">Написать</a></li>
                      <li className="divider"></li>
                      <li><a href="bani-otzivy/?service=logout"><i className="glyphicon glyphicon-log-out"></i> Выйти</a></li>
                  </ul>
              </li>*/}

          </ul>
        </div>

      </div>
    </div>;
	}
}