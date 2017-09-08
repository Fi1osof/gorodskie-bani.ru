import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

export default class MainMenu extends Component{

	constructor(props){

		super(props);

		this.state = {
			ratingsOpened: false,
			citiesOpened: false,
		}
	}

	render(){

		let {
			ratingsOpened,
			citiesOpened,
		} = this.state;

		return <div 
      className="navbar navbar-default"
      style={{
        marginBottom: 0,
      }}
    >
      <div className="container">
        <div className="navbar-header">
          <Link 
            href="/" 
            to="/" 
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
              <li className="first"><a href="bani-otzivy/" title="Обзоры и отзывы">Обзоры и отзывы </a></li>

              <li>
              <a 
              	href="javascript:;" 
              	title="Рейтинги заведений" 
              	className="dropdown-toggle"
              	onClick={event => this.setState({
              		ratingsOpened: !ratingsOpened,
              	})}
              >Рейтинги заведений <i className="fa fa-angle-down"></i></a>
              <ul 
              	className="dropdown-menu"
              	style={{
              		display: ratingsOpened ? 'block' : undefined,
              	}}
              >
                <li className="first"><a href="ratings/steam/" title="Парилка">Парилка</a></li>
                <li><a href="ratings/service/" title="Обслуживание">Обслуживание</a></li>
                <li><a href="ratings/interior/" title="Интерьер">Интерьер</a></li>
                <li><a href="ratings/cuisine/" title="Кухня">Кухня</a></li>
                <li><a href="ratings/cleanliness/" title="Чистота">Чистота</a></li>
                <li><a href="ratings/grafik-rabotyi/" title="График работы">График работы</a></li>
                <li><a href="ratings/prices/" title="Стоимость услуг">Стоимость услуг</a></li>
                <li><a href="ratings/cuisine-prices/" title="Стоимость кухни">Стоимость кухни</a></li>
                <li><a href="ratings/skidki-i-akczii/" title="Скидки и акции">Скидки и акции</a></li>
                <li><a href="ratings/friendliness/" title="Дружественная атмосфера">Дружественная атмосфера</a></li>
                <li className="last"><a href="ratings/lgotyi-postoyannyim-posetitelyam/" title="Льготы постоянным посетителям">Льготы постоянным посетителям</a></li>
              </ul>
              </li>

              <li>
              	<a 
              		href="javascript:;" 
              		title="Города" 
              		className="dropdown-toggle" 
              		data-toggle="dropdown"
	              	onClick={event => this.setState({
	              		citiesOpened: !citiesOpened,
	              	})}
              	>Города <i className="fa fa-angle-down"></i></a>
	              <ul 
	              	className="dropdown-menu"
	              	style={{
	              		display: citiesOpened ? 'block' : undefined,
	              	}}
	              >
	                <li className="first"><a href="moscow/" title="Москва">Москва</a></li>
	                <li><a href="moskovskaya-oblast/" title="Московская область">Московская область</a></li>
	                <li><a href="st-petersburg/" title="Санкт-Петербург">Санкт-Петербург</a></li>
	                <li><a href="city/kronshtadt/" title="Кронштадт">Кронштадт</a></li>
	                <li><a href="city/velikij-novgorod/" title="Великий Новгород">Великий Новгород</a></li>
	                <li><a href="city/volgograd/" title="Волгоград">Волгоград</a></li>
	                <li><a href="city/voronezh/" title="Воронеж">Воронеж</a></li>
	                <li><a href="city/ekaterinburg/" title="Екатеринбург">Екатеринбург</a></li>
	                <li><a href="city/krasnoyarsk/" title="Красноярск">Красноярск</a></li>
	                <li><a href="city/novosibirsk/" title="Новосибирск">Новосибирск</a></li>
	                <li><a href="penza/" title="Пенза">Пенза</a></li>
	                <li><a href="city/samara/" title="Самара">Самара</a></li>
	                <li><a href="city/tomsk/" title="Томск">Томск</a></li>
	                <li><a href="city/ufa/" title="Уфа">Уфа</a></li>
	                <li><a href="chelyabinsk/" title="Челябинск">Челябинск</a></li>
	                <li><a href="cherepovecz/" title="Череповец">Череповец</a></li>
	                <li><a href="city/rostov-na-donu/" title="Ростов-на-Дону">Ростов-на-Дону</a></li>
	                <li><a href="city/nizhnij-novgorod/" title="Нижний Новгород">Нижний Новгород</a></li>
	                <li><a href="city/pskov/" title="Псков">Псков</a></li>
	                <li><a href="city/kursk/" title="Курск">Курск</a></li>
	                <li><a href="city/tver/" title="Тверь">Тверь</a></li>
	                <li><a href="city/blagoveshhensk/" title="Благовещенск">Благовещенск</a></li>
	                <li className="last"><a href="city/kirov/" title="Киров">Киров</a></li>
	              </ul>
              </li>
              <li className="last"><a href="contacts.html" title="Контакты">Контакты</a></li>
              <li className="dropdown">
                  <a id="office" href="#" data-toggle="dropdown" className="dropdown-toggle"><i className="glyphicon glyphicon-user"></i><span className="caret"></span></a>
                  <ul aria-labelledby="office" className="dropdown-menu">
                      <li><a href="profile/">Профиль</a></li>
                      <li><a href="add-topic.html">Написать</a></li>
                      <li className="divider"></li>
                      <li><a href="bani-otzivy/?service=logout"><i className="glyphicon glyphicon-log-out"></i> Выйти</a></li>
                  </ul>
              </li>

          </ul>
        </div>

      </div>
    </div>;
	}
}