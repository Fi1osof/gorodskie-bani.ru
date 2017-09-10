import './styles/styles.less';

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

import * as proxyActions from 'modules/Redux/actions/proxyActions';
import * as userActions from 'modules/Redux/actions/userActions';
import * as documentActions from 'modules/Redux/actions/documentActions';

import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';

import {DataStore, Dispatcher} from 'react-cms-data-view';

import {request, saveItem} from 'react-cms-data-view/src/Utils';

import Informer from 'structor-templates/components/Informer';

import MainMenu from './MainMenu';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const customStyles = createMuiTheme({
  palette: createPalette({
  }),
});

const defaultProps = {
  connector_url: '/assets/components/modxsite/connectors/connector.php',
};

/*
  Инициируется один раз
*/
export class AppMain extends Component{

  static childContextTypes = {
    request: PropTypes.func,
    apiRequest: PropTypes.func,
    openCompanyPage: PropTypes.func,
    loadCompanyMapData: PropTypes.func,
    loadCompanyFullData: PropTypes.func,
    updateItem: PropTypes.func,
    updateContactItem: PropTypes.func,
    saveContactItem: PropTypes.func,
    setPageTitle: PropTypes.func,
    companiesStore: PropTypes.object,
  };

  getChildContext() {

    let {
    } = this.props;

    let {
      companiesStore,
    } = this.state;

    let context = {
      request: this.request,
      apiRequest: this.apiRequest,
      openCompanyPage: this.openCompanyPage,
      loadCompanyMapData: this.loadCompanyMapData,
      loadCompanyFullData: this.loadCompanyFullData,
      updateItem: this.updateItem,
      updateContactItem: this.updateContactItem,
      saveContactItem: this.saveContactItem,
      setPageTitle: this.setPageTitle,
      companiesStore,
    };

    return context;
  }

  constructor(props){

    super(props);

    let notifications_store = new DataStore(new Dispatcher());

    this.state = {
      notifications_store: notifications_store,
      companiesStore: new DataStore(new Dispatcher()),
    }

    let {
      user,
      document: {
        stores,
      },
    } = props;

    user.hasPermission = this.hasPermission;

    stores.notifications_store = notifications_store;
  }

  componentWillMount(){

    let {
      companiesStore,
    } = this.state;

    companiesStore.getDispatcher().register(payload => {

      this.forceUpdate();
    });
  }

  componentDidMount(){

    let {
      documentActions,
    } = this.props;

    this.loadApiData();

    return;
  }

  componentDidUpdate(prevProps, prevState){


    // let {
    //   user: {
    //     user,
    //   }
    // } = this.props;

    // let {
    //   user: {
    //     user: prevUser,
    //   }
    // } = prevProps;

    // // console.log('componentDidUpdate', prevProps.user, user);

    // // console.log('loadApiData componentDidUpdate', user, prevUser);
    
    // // Если пользователь авторизовался, то перезагружаем данные зависимые
    
    // if(user && user.id && (!prevUser || user.id != prevUser.id)){
    //   this.loadApiData();
    // }
  }

  setPageTitle = (title) => {
    if(
      typeof window !== "undefined"
      && (window.document.title != title)
    ){
      window.document.title = title;
    }
  }

  updateItem = (item, data, store) => {

    console.log("App updateItem", store, item, data);

    if(!item){
      console.error("Не указан объект");
      return false;
    }

    if(!store){
      console.error("Не указано хранилище");
      return false;
    }


    let newState = {};

    Object.assign(newState, data);

    let _isDirty = {};

    item._isDirty && Object.assign(_isDirty, item._isDirty);

    Object.assign(_isDirty, newState);

    newState._isDirty = _isDirty;

    store.getDispatcher().dispatch(store.actions['UPDATE'], item, newState);

    return;
  }

  updateContactItem = (item, data) => {

    let {
      companiesStore,
    } = this.state;

    if(data.coords){
      Object.assign(data, data.coords);
    }

    // console.log('new updateContactItem', item, data);

    // console.log('new updateContactItem item finded', ContactsStore.getState().find(n => n === item));
    // console.log('new updateContactItem item finded by ID', ContactsStore.getState().find(n => n.id == item.id));


    this.updateItem(item, data, companiesStore);
  }





  saveContactItem = (item) => {
    // console.log('saveContactItem', item);

    let {
      companiesStore: store,
    } = this.state;

    let {
      id: itemId,
    } = item;

    const callback = (data, errors) => { 

      // if(data.success && data.object){

      //   const {
      //     id,
      //   } = data.object;

      //   if(id != itemId){
      //     browserHistory.replace(`/db/contacts/${id}/`);
      //   }

      //   return;
      // }
    }

    this.saveItem(store, item, 'companies/', callback);
  }

  saveItem = (store, item, connector_path, callback) => {

    console.log("App saveItem store", store);
    console.log("App saveItem item", item);
    console.log("App saveItem path", connector_path);

    let {
      connector_url,
      documentActions: {
        addInformerMessage,
      },
    } = this.props;

    // console.log('saveItem STORE UPDATE', item, store);

    if(!store){

      console.error("Не было получено хранилище");
      return;
    }

    if(
      !item
      || item._sending === true
    ){
      return;
    }

    let {
      id,
      _isDirty,
    } = item;

    if(!_isDirty){

      addInformerMessage({
        text: "Нечего сохранять",
        autohide: 4000,
      });
      return;
    }

    let dispatcher = store.getDispatcher();

    item._sending = true;
      
    var action = id && id > 0 ? 'update' : 'create';

    var options = options || {};

    var body = {};

    body['id'] = id;;
 

    for(var i in _isDirty){
      var value = _isDirty[i];

      if(value === undefined){
        continue;
      }

      // Пропускаем свойства-объекты
      if(
        typeof value === "object" 
        && !Array.isArray(value)
        && value !== null
      ){
        continue;
      }

      // Пропускаем временные свойства
      // if(/^\_/.test(i)){
      //   continue;
      // }

      // console.log('Form item', i, value, Array.isArray(value));

      body[i] = value;
    };

    this.request(connector_path, false, `${connector_path}${action}`, body, {
      callback: (data, errors) => {
        // console.log('DATA', data);
        // self.setState({items: data.object});

        let newObject = data.object || {};

        var errors = {};

        if(data.success === true){

          // var items = lodash.clone(this.state.items);

   

          Object.assign(newObject, {
            _isDirty: undefined,
          });


          addInformerMessage({
            type: "success",
            text: data.message || "Объект успешно сохранен",
            autohide: 4000,
          });
        }
        else{

          if(data.data && data.data.length){
            data.data.map(function(error){
              var value = error.msg;
              if(value && value != ''){
                errors[error.id] = value;
              }
            });
          }

          errors.error_message = data.message;

          // addInformerMessage && 

          //   addInformerMessage({
          //     text: data.message || "Ошибка выполнения запроса",
          //     autohide: 4000,
          //   });

          // this.forceUpdate();
        }

        // newState.errors = this.state.errors || {};

        // newState.errors[item.id || 0] = errors;

        // item._errors = errors;

        callback && callback(data, errors);
        
        // if(callback){
        // }
        
        // this.forceUpdate();
    

        // item._sending = false;

        // console.log('saveItem STORE UPDATE 2', item, store);

        // this.forceUpdate();

        // TODO store.commit

        Object.assign(newObject, {
          _errors: errors,
          _sending: false,
        });
        dispatcher.dispatch(store.actions["SAVE"], item, newObject); 

        this.forceUpdate();
      }
    });

    // return;

    // fetch(this.props.connector_url + '?pub_action='+ connector_path + action,{
    //   credentials: 'same-origin',
    //   method: options.method || "POST",
    //   body: body,
    // })
    //   .then(function (response) {

    //     return response.json()
    //   })
    //   .then((data) => {

    //   })
    //   .catch((error) => {
    //       console.error('Request failed', error, this); 

    //       item && (item._sending = false);

    //       addInformerMessage && addInformerMessage({
    //         text: "Ошибка выполнения запроса",
    //         autohide: 4000,
    //       });
    //     }
    //   );

    this.forceUpdate();
    return;
  }


  loadApiData(){

    this.loadCompanies();
  }


  loadCompanies(){

    this.apiRequest('companies', false, 'graphql', {
      query: JSON.stringify(`query{
        companies(limit:0) {
          success
          message
          total
          limit
          page
          object {
            id
            name
            alias
            uri
            image {
              marker_thumb
            }
            coords{
              lat,
              lng,
            }
          }
        }
      }`),
    },{
      callback: (data, errors) => {

        let {
          companiesStore,
        } = this.state;

        console.log('companiesStore callback', data, errors);

        if(data.success && data.object){
          // this.setState({
          //   resourcesMap: data.object,
          // });

          const {
            object,
          } = data.object.companies || {};

          companiesStore.getDispatcher().dispatch(companiesStore.actions['SET_DATA'], object || []);
        }
      },
    });
  }

  loadCompanyFullData = (item) => {

    console.log('loadCompanyFullData item', item)

    if(!item){
      return false;
    }

    const {
      id,
    } = item;

    const itemId = parseInt(id);

    if(!itemId){
      return false;
    }

    this.apiRequest('company', true, 'graphql', {
      query: JSON.stringify(`query{ 
        companies(
          limit: 1
          id: ${itemId}
        ) {
          object{
            id
            name
            longtitle
            description
            content
            alias
            uri
            city
            coords {
              lat
              lng
            }
            image {
              thumb
              small
              big
              marker_thumb
            }
            gallery {
              image {
                thumb
                small
                middle
                big
              }
            }
            tvs {
              address
              site
              facility_type
              phones
              work_time
              prices
              metro
            }
            ratingAvg{
              rating
              max_vote
              min_vote
              quantity
              quantity_voters
            }
            ratingsByType {
              rating
              max_vote
              min_vote
              type
              quantity
              quantity_voters
            }
            votes {
              rating
              type
            }
            comments(order:asc){
              id
              text
              parent
              author_username
              author_fullname
              author_avatar
              createdon
            }
          }
        }
      }`),
    },{
      callback: (data, errors) => {

        let {
          companiesStore,
        } = this.state;

        console.log('loadCompanyFullData callback', data, errors);

        if(data.success && data.object){
          // this.setState({
          //   resourcesMap: data.object,
          // });

          const {
            object,
          } = data.object.companies || {};

          const dataObject = object && object.find(n => n.id == itemId) || undefined;

          if(dataObject){
            Object.assign(item, dataObject);
            companiesStore.getDispatcher().dispatch(companiesStore.actions['UPDATE'], item);
          }

        }
      },
    });
  }

  loadCompanyMapData = (item, force) => {

    if(!item){
      return false;
    }

    const {
      id,
      _mapDataLoaded,
    } = item;


    const itemId = parseInt(id);

    if(!itemId){
      return false;
    }

    if(_mapDataLoaded && !force){
      return;
    }

    console.log('loadCompanyMapData item', item);

    item._mapDataLoaded = true;

    this.apiRequest(`company_ratings_${id}`, false, 'graphql', {
      query: JSON.stringify(`query{ 
        companies(
          limit: 1
          id: ${itemId}
        ) {
          object {
            id
            ratingAvg {
              rating
              max_vote
              min_vote
              quantity
            }
          }
        }
      }`),
    },{
      callback: (data, errors) => {

        let {
          companiesStore,
        } = this.state;

        console.log('loadCompanyMapData callback', data, errors);

        if(data.success && data.object){
          // this.setState({
          //   resourcesMap: data.object,
          // });

          const {
            object,
          } = data.object.companies || {};

          const dataObject = object && object.find(n => n.id == itemId) || undefined;

          if(dataObject){
            Object.assign(item, dataObject);
            companiesStore.getDispatcher().dispatch(companiesStore.actions['UPDATE'], item);
          }

        }
      },
    });
  }

  openCompanyPage(item){
    if(!item){
      console.error("Item undefined");
      return;
    }

    item.uri && browserHistory && browserHistory.push(item.uri);
  }

  hasPermission = (perm) => {
    let{
      user,
    } = this.props.user;

    if(!user || user.id == 0){
      return false;
    }

    return user.sudo == "1" || user.policies[perm] || false;
  }


  request = (context, allowMultiRequest, connector_path, params, options) => {

    if(allowMultiRequest === undefined){
      allowMultiRequest = false;
    }

    if(this.state[context] === undefined){
      this.state[context] = {};
    }

    if(!allowMultiRequest && this.state[context].inRequest === true){
      return;
    }


    let {
      connector_url: default_connector_url,
      user,
    } = this.props;

    params = params || {}

    Object.assign(params, {
      token: user.token,
    });
    
    var newState = {};

    newState[context] = this.state[context];

    newState[context].inRequest = true;

    this.setState(newState);

    options = options || {};


    let {
      connector_url,
      callback: callback2,
    } = options;

    connector_url = connector_url || default_connector_url;

    let callback = (data, errors) => {

      // let errors = {};

      var newState = {};

      newState[context] = this.state[context];

      newState[context].inRequest = false;
      newState[context].errors = errors; 

      this.setState(newState, () => {

        callback2 && callback2(data, errors);
      });

    }
    
    options.callback = callback;

    request.call(this, connector_url, connector_path, params, options);
  }
  

  apiRequest = (context, allowMultiRequest, connector_path, params, options) => {

    options = Object.assign({
      connector_url: '/api/',
    }, options || {});

    return this.request(context, allowMultiRequest, connector_path, params, options);
  }

  render() {

    let {
      children, 
      user, 
      ...other
    } = this.props;

    let {
      notifications_store
    } = this.state;

    return <MuiThemeProvider theme={customStyles}>
      <div
        className="MainApp"
      >
        <MainMenu 
        />

        <div 
          id="Module"
        >
          {children}
        </div>

      <Informer
        store={notifications_store}
      />  

      </div>
    </MuiThemeProvider>

    ;
  }
}

AppMain.defaultProps = defaultProps;

AppMain.propTypes = {}

AppMain.defaultProps = defaultProps;
AppMain.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};


function mapDispatchToProps(dispatch) {

  let props = {
    proxyActions: bindActionCreators(proxyActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    documentActions: bindActionCreators(documentActions, dispatch),
  }

  props.addInformerMessage = props.documentActions.addInformerMessage;

  return props;
}

function mapStateToProps(state) {

  var currentState = {};

  Object.assign(currentState, state.document);

  currentState.user = state.user;
  currentState.document = state.document;

  return currentState;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
