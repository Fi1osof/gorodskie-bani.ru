import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import LoginIcon from 'material-ui-icons/PermIdentity';
import AddIcon from 'material-ui-icons/Add';
import AtentionIcon from 'material-ui-icons/ErrorOutline';

import WsProxy from 'modules/Site/components/WsProxy';

import cookies from 'js-cookie';

export default class MainMenu extends Component{

  static contextTypes = {
    user: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    CompaniesStore: PropTypes.object.isRequired,
    TopicsStore: PropTypes.object.isRequired,
    ResourcesStore: PropTypes.object.isRequired,
    CommentsStore: PropTypes.object.isRequired,
    UsersStore: PropTypes.object.isRequired,
    RatingsStore: PropTypes.object.isRequired,
    localQuery: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    triggerGoal: PropTypes.func.isRequired,
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

    })
    .catch(e => {
      console.error(e);
    });

  }

  addTopic(){

    const {
      localQuery,
    } = this.context;


    localQuery({
      operationName: "addTopic",
    })
    .then(r => {

    })
    .catch(e => {
      console.error(e);
    });

  }

  closeMenu(){

    $('#navbar-main').removeClass("in");

  }


  triggerGoal(goal){

    const {
      triggerGoal,
    } = this.context;

    triggerGoal(goal);

  }


	render(){

    const {
      coords,
      user: {
        user,
      },
      userActions,
    } = this.context;

    const {
      username,
    } = user || {};

		let {
      ratings,
      cities,
			ratingsOpened,
			citiesOpened,
		} = this.state;

    let base_url = "/";

    let importantPage;

    // const importantArticleReaded = cookies.get("importantArticleReaded", "1");

    // importantPage = typeof window === "undefined" || importantArticleReaded === "1" ? null : '/topics/redaktirovanie-informaczii-o-bannyix-zavedeniyax-1655.html';

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
        uri,
      } = Type;

      const link = `/${uri}`;

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

              <li>
                <a 
                  href="/" 
                  title="Все бани на карте" 
                  className="dropdown-toggle" 
                  data-toggle="dropdown"
                  // onClick={event => this.setState({
                  //  citiesOpened: !citiesOpened,
                  // })}
                >На карте <i className="fa fa-angle-down"></i></a>
                <ul 
                  className="dropdown-menu"
                  style={{
                    display: citiesOpened ? 'block' : undefined,
                    maxHeight: "70vh",
                    overflow: "auto",
                  }}
                >

                  {citiesList}

                </ul>
              </li>

              <li>
                <Link 
                  to="/ratings/" 
                	href="/ratings/" 
                	title="Рейтинги заведений" 
                	className="dropdown-toggle"
                  data-toggle="dropdown"
                	// onClick={event => this.setState({
                	// 	ratingsOpened: !ratingsOpened,
                	// })}
                >
                  Рейтинги <i className="fa fa-angle-down"></i>
                </Link>
                <ul 
                	className="dropdown-menu"
                	style={{
                		display: ratingsOpened ? 'block' : undefined,
                	}}
                >
                  {ratingsList}
                </ul>
              </li>

              {importantPage
                ?
                  <li>
                    <Link
                      to={importantPage}
                      href={importantPage}
                      title="Важная новость" 
                      className="flex align-center"
                      style={{
                        display: 'flex',
                      }}
                      onClick={event => {

                        cookies.set("importantArticleReaded", "1", { expires: 15 });

                        this.triggerGoal("importantArticle");

                        this.closeMenu();

                      }}
                    >
                      <AtentionIcon 
                        color="red"
                        style={{
                          marginRight: 3,
                        }}
                      />
                      Важная новость
                    </Link>
                  </li>
                :
                  <li>
                    <Link
                      to="/topics/" 
                      href="/topics/" 
                      title="Рейтинги заведений" 
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      // onClick={event => this.setState({
                      //  ratingsOpened: !ratingsOpened,
                      // })}
                    >
                      Публикации <i className="fa fa-angle-down"></i>
                    </Link>
                    <ul 
                      className="dropdown-menu"
                    >
                      <li className="first">
                        <Link 
                          to="/bani-otzivy/" 
                          href="/bani-otzivy/" 
                          title="Обзоры и отзывы"
                          onClick={event => {
                            this.closeMenu();
                          }}
                          style={{
                            paddingLeft: 25,
                            paddingRight: 25,
                          }}
                        >
                          Обзоры и отзывы 
                        </Link>
                      </li>
                      <li className="">
                        <Link 
                          to="/topics/" 
                          href="/topics/" 
                          title="Новости"
                          onClick={event => {
                            this.closeMenu();
                          }}
                          style={{
                            paddingLeft: 25,
                            paddingRight: 25,
                          }}
                        >
                          Новости
                        </Link>
                      </li>
                      {user 
                        ?
                        <li className="">
                          <a 
                            // to={`/profile/${username}/add-topic`} 
                            // href={`/profile/${username}/add-topic`}
                            href="javascript:;"
                            title="Добавить публикацию"
                            rel="nofollow"
                            onClick={event => {
                              this.closeMenu();
                              this.addTopic();
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: 25,
                              paddingRight: 25,
                            }}
                          >
                            <IconButton
                              accent
                              style={{
                                padding: 0,
                                margin: 0,
                                height: 24,
                                width: 24,
                                marginLeft: -25,
                              }}
                            >
                              <AddIcon 
                              /> 
                            </IconButton>
                            Добавить публикацию
                          </a>
                        </li>
                        :
                        null
                      }
                    </ul>
                  </li>
              }


              <li className="last">
                <Link 
                  to="/contacts.html" 
                  href="/contacts.html" 
                  title="Контакты"
                  onClick={event => {
                    this.closeMenu();
                  }}
                >
                  Контакты
                </Link>
              </li>
              
              {user
                ?
                <li className="dropdown">
                  <a id="office" href="javascript:;" data-toggle="dropdown" className="dropdown-toggle"><i className="glyphicon glyphicon-user"></i><span className="caret"></span></a>
                  <ul aria-labelledby="office" className="dropdown-menu">
                    <li>
                      <Link 
                        to={`/profile/${username}`}
                        href={`/profile/${username}`}
                      >Профиль
                      </Link>
                    </li>
                    
                    {/*<li><a href="add-topic.html">Написать</a></li>*/}
                    
                    <li className="divider"></li>
                    <li>
                      <a 
                        href="javascript:;"
                        onClick={e => {
                          userActions.logout();
                        }}
                      >
                        <i className="glyphicon glyphicon-log-out"></i> Выйти
                      </a>
                    </li>
                  </ul>
                </li>
                :
                <li>
                  <a 
                    href="javascript:;" 
                    rel="nofollow"
                    onClick={event => {
                      userActions.loginClicked();
                    }}
                  >
                    <Grid 
                      container
                      gutter={0}
                      align="center"
                    >
                      <LoginIcon 
                        style={{
                          height: 16,
                          width: 16,
                        }}
                      />  Войти
                    </Grid>
                  </a>


                </li>
                
              }

                

          </ul>

          <WsProxy
          />
          
        </div>

      </div>
    </div>;
	}
}