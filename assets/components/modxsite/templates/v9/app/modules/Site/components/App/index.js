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

// import ORM from '../ORM';

import RootType, {
  Mutation,
  rootDirectives,
} from '../ORM';

import Company from '../ORM/Company';
import User from '../ORM/User';

import defaultQuery from '../ORM/query';
import rootResolver from '../ORM/resolver';

import {
  buildSchema,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,

  introspectionQuery, 
  buildClientSchema, 
  printSchema,
} from 'graphql';


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
    // prepareCompaniesLocalData: PropTypes.func,
    loadCompanyFullData: PropTypes.func,
    updateItem: PropTypes.func,
    updateContactItem: PropTypes.func,
    saveContactItem: PropTypes.func,
    setPageTitle: PropTypes.func,
    CompaniesStore: PropTypes.object,
    // CompaniesStore: PropTypes.object,
    // orm: PropTypes.object,
    schema: PropTypes.object,
    // db: PropTypes.object,
    localQuery: PropTypes.func,
    remoteQuery: PropTypes.func,
  };

  getChildContext() {

    let {
    } = this.props;

    let {
      CompaniesStore,
      // orm,
      schema,
      // db,
    } = this.state;

    let context = {
      request: this.request,
      apiRequest: this.apiRequest,
      openCompanyPage: this.openCompanyPage,
      // prepareCompaniesLocalData: this.prepareCompaniesLocalData,
      loadCompanyFullData: this.loadCompanyFullData,
      updateItem: this.updateItem,
      updateContactItem: this.updateContactItem,
      saveContactItem: this.saveContactItem,
      setPageTitle: this.setPageTitle,
      CompaniesStore,
      // orm,
      schema,
      // db,
      localQuery: this.localQuery,
      remoteQuery: this.remoteQuery,
    };

    return context;
  }

  constructor(props){

    super(props);

    let notifications_store = new DataStore(new Dispatcher());


    // const orm = new ORM();
    const schema = this.getSchema();

    // const db = {
    //   // getCollection: (args, context) => this.getCollection(args, context),
    //   // getContactsCollection: (args, context) => this.getContactsCollection(args, context),
    //   // getPlacesCollection: (args, context) => this.getPlacesCollection(args, context),
    //   // getServicesCollection: (args, context) => this.getServicesCollection(args, context),
    //   // getPlaceContactsCollection: (args, context) => this.getPlaceContactsCollection(args, context),
    //   // updateContact: (args, context) => this.updateContact(args, context),
    // };

    this.state = {
      notifications_store: notifications_store,
      CompaniesStore: new DataStore(new Dispatcher()),
      RatingsStore: new DataStore(new Dispatcher()),
      UsersStore: new DataStore(new Dispatcher()),
      CommentsStore: new DataStore(new Dispatcher()),
      // orm,
      schema,
      // db,
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


  getSchema(){

    // const RootType = new GraphQLObjectType({
    //   name: 'RootType',
    //   description: 'Корневой раздел',
    //   fields: {
    //     companies: {
    //       type: new GraphQLList(new GraphQLObjectType({
    //         name: 'Company',
    //         fields: {
    //           id: {
    //             type: GraphQLInt,
    //           },
    //           name: {
    //             type: GraphQLString,
    //           },
    //         },
    //       })),
    //     },
    //   },
    // });

    return new GraphQLSchema({
      query: RootType,
      // mutation: Mutation,
    });

  }

  // localQuery = (graphQLParams) => {

  //   const {
  //     schema,
  //   } = this.state;

  //   // var schema = this._getSchema();

  //   const {
  //     query,
  //     operationName,
  //     variables,
  //   } = graphQLParams;

  //   // return graphql({
  //   //   schema, 
  //   //   source: query,
  //   //   variableValues: variables || undefined,
  //   //   contextValue: this.context,
  //   // }).then((response) => {

  //   //   
  //   // });

  //   // graphql({
  //   //   schema, 
  //   //   source: query,
  //   //   variableValues: variables || undefined,
  //   //   contextValue: this.context,
  //   // }).then((response) => {

  //   //   this.success("", response);
  //   // });

  //   return new Promise((resolve, reject) => {

  //     // class user {

  //     //   constructor(props){

  //     //     Object.assign(this, props);
  //     //   }

  //     // }

  //     const {
  //       CompaniesStore,
  //       RatingsStore,
  //       UsersStore,
  //     } = this.state;

  //     graphql({
  //       schema,
  //       operationName,
  //       source: query,
  //       rootValue: {
  //         companies: CompaniesStore.getState(),
  //         users: UsersStore.getState(),
  //         ratings: RatingsStore.getState(),
  //       },
  //       variableValues: variables || undefined,
  //       contextValue: this.getChildContext(),
  //       fieldResolver: (source, args, context, info) => {
  //         // 
  //         // 
  //         // 
  //         // 
  //         // 

  //         let result;

  //         const {
  //           fieldName,
  //         } = info;

  //         if(source){

  //           if(typeof source.fieldResolver === 'function'){
  //             result = source.fieldResolver(source, args, context, info);
  //           }

  //           else result = source[fieldName];

  //         }
  //         // else{

  //         //   result = {
  //         //     success: true,
  //         //     object: [new user({
  //         //       id: 12,
  //         //       name: "DSfsdf",
  //         //     })],
  //         //   };

  //         // }

  //         // 

  //         return result;
          
  //       }
  //     }).then((result) => {

        

  //       let {
  //         errors,
  //       } = result;

  //       if(errors && errors.length){
  //         let {
  //           message,
  //           ...other
  //         } = errors[0];

  //         return reject(message, {...other});
  //       }

  //       resolve(result);
  //     })
  //     .catch(e => {
  //       // console.error(e);
  //       reject(e);
  //     });

  //     // resolve({
  //     //   data: {},
  //     // });
  //   });
  // }



  // // remoteQuery = (query, variables) => {
  // remoteQuery = (graphQLParams) => {

  //   if(typeof graphQLParams !== 'object'){
  //     graphQLParams = {
  //       query: graphQLParams,
  //     };
  //   }

  //   const {
  //     query,
  //     operationName,
  //     variables,
  //   } = graphQLParams;

  //   return new Promise((resolve, reject) => {

  //     this.apiRequest(null, true, 'graphql', {
  //       query,
  //       variables,
  //     },{
  //       callback: (data, errors) => {

  //         // let {
  //         //   CompaniesStore,
  //         // } = this.state;

          

  //         if(data.success){
  //           // this.setState({
  //           //   resourcesMap: data.object,
  //           // });

  //           // const {
  //           //   object,
  //           // } = data.object.companies || {};

  //           // let companies = object && object.map(n => new Company(n)) || [];

  //           // CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['SET_DATA'], companies);

  //           return resolve(data);
  //         }
  //         else{
  //           return reject(data);
  //         }
  //       },
  //     });

  //   });

  // }

  localQuery = (graphQLParams) => {

    const {
      schema,
    } = this.state;

    // var schema = this._getSchema();


    // console.log('rootResolver', rootResolver);

    // 

    // return {};

    const {
      query,
      operationName,
      variables,
    } = graphQLParams;

    // return graphql({
    //   schema, 
    //   source: query,
    //   variableValues: variables || undefined,
    //   contextValue: this.context,
    // }).then((response) => {

    //   
    // });

    // graphql({
    //   schema, 
    //   source: query,
    //   variableValues: variables || undefined,
    //   contextValue: this.context,
    // }).then((response) => {

    //   this.success("", response);
    // });

    // 

    // return new Promise(resolve => resolve([{}]));

    return new Promise((resolve, reject) => {

      const {
        // ContactsStore,
        // PlacesStore,
        // PlaceContactsStore,
      } = this.state;

      graphql({
        schema,
        operationName,
        source: query || defaultQuery,
        // rootValue: undefined,
        variableValues: variables || undefined,
        // contextValue: this.getChildContext(),
        contextValue: this,
        fieldResolver: rootResolver,
        // directives: rootDirectives,
      }).then((result) => {

        let {
          errors,
        } = result;

        if(errors && errors.length){
          let {
            message,
            ...other
          } = errors[0];

          console.error("localQuery error", result);
          return reject(message, {...other});
        }

        resolve(result);
      })
      .catch(e => {
        console.error("localQuery error", e);
        reject(e);
      });
    });
  }



  // remoteQuery = (query, variables) => {
  remoteQuery = async (graphQLParams) => {

    if(typeof graphQLParams !== 'object'){
      graphQLParams = {
        query: graphQLParams,
      };
    }

    const {
      query,
      operationName,
      variables,
    } = graphQLParams;

    return new Promise((resolve, reject) => {

      this.apiRequest(null, true, 'graphql', {
        query,
        operationName,
        variables,
      },{
        callback: (data, errors) => {

          // let {
          //   CompaniesStore,
          // } = this.state;

          

          if(data.success){
            // this.setState({
            //   resourcesMap: data.object,
            // });

            // const {
            //   object,
            // } = data.object.companies || {};

            // let companies = object && object.map(n => new Company(n)) || [];

            // CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['SET_DATA'], companies);

            return resolve(data);
          }
          else{
            return reject(data);
          }
        },
      });

    });

  }


  // componentWillMount(){
  // }

  componentDidMount(){

    let {
      CompaniesStore,
      RatingsStore,
    } = this.state;

    CompaniesStore.getDispatcher().register(payload => {

      this.forceUpdate();
    });

    RatingsStore.getDispatcher().register(payload => {

      this.forceUpdate();
    });

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

    // // 

    // // 
    
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
      CompaniesStore,
    } = this.state;

    if(data.coords){
      Object.assign(data, data.coords);
    }

    // 

    // 
    // 


    this.updateItem(item, data, CompaniesStore);
  }





  saveContactItem = (item) => {
    // 

    let {
      CompaniesStore: store,
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

    
    
    

    let {
      connector_url,
      documentActions: {
        addInformerMessage,
      },
    } = this.props;

    // 

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

      // 

      body[i] = value;
    };

    this.request(connector_path, false, `${connector_path}${action}`, body, {
      callback: (data, errors) => {
        // 
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

        // 

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


  async loadApiData(){

    await this.remoteQuery({
      operationName: "apiData",
      variables: {
        limit: 0,
      },
    })
    .then(data => {
      

      // console.log('loadCompanies', data);

      let {
        CompaniesStore,
        RatingsStore,
        UsersStore,
        CommentsStore,
      } = this.state;

      // 

      if(data.success && data.object){
        let {
          companies,
          users,
          ratings,
          comments,
        } = data.object || {};

        // let companies = object && object.map(n => new Company(n)) || [];
        companies = companies &&  companies.map(n => this.createStoreObject(Company, n)) || [];
        users = users && users.map(n => this.createStoreObject(User, n)) || [];
        ratings = ratings || [];
        comments = comments || [];

        CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['SET_DATA'], companies);
        UsersStore.getDispatcher().dispatch(UsersStore.actions['SET_DATA'], users);
        RatingsStore.getDispatcher().dispatch(RatingsStore.actions['SET_DATA'], ratings || []);
        CommentsStore.getDispatcher().dispatch(CommentsStore.actions['SET_DATA'], comments || []);

        // Устанавливаем сразу локальные данные для компаний
        // companies.map(n => {
        //   this.prepareCompaniesLocalData(n);
        // });
      }
    })
    .catch(e => {
      console.error(e);
    });
  }


  __loadCompanies(){

    this.apiRequest('companies', false, 'graphql', {
      query: `query{
        companies(limit:0) {
          total
          limit
          page
          object {
            id
            name
            alias
            uri
            image {
              original
            }
            coords{
              lat,
              lng,
            }
          }
        }
        ratings(limit:0) {
          rating
          type
          company_id
          voter
        }
        users(limit:0) {
          count
          total
          limit
          page
          object {
            id
            username
            fullname
            email
            image {
              original
            } 
            active
            blocked
          }
        }
      }`,
    },{
      callback: (data, errors) => {

        let {
          CompaniesStore,
          RatingsStore,
          UsersStore,
        } = this.state;

        // 

        if(data.success && data.object){
          // this.setState({
          //   resourcesMap: data.object,
          // });

          // const {
          //   object,
          // } = data.object.companies || {};

          let {
            companies,
            users,
            ratings,
          } = data.object || {};

          // let companies = object && object.map(n => new Company(n)) || [];
          companies = companies && companies.object && companies.object.map(n => this.createStoreObject(Company, n)) || [];
          users = users && users.object && users.object.map(n => this.createStoreObject(User, n)) || [];
          // ratings = ratings && ratings.object || [];

          CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['SET_DATA'], companies);
          UsersStore.getDispatcher().dispatch(UsersStore.actions['SET_DATA'], users);
          RatingsStore.getDispatcher().dispatch(RatingsStore.actions['SET_DATA'], ratings || []);

          // Устанавливаем сразу локальные данные для компаний
          companies.map(n => {
            this.prepareCompaniesLocalData(n);
          });
        }
      },
    });
  }

  createStoreObject(Class, data){
    return new Class(data, this);
  }

  loadRatings(){

    return new Promise((resolve, reject) => {
 

      this.remoteQuery({
        operationName: "Ratings",
      })
        .then(result => {

          // 

          let {
            RatingsStore,
          } = this.state;

          if(result.success){

            const {
              ratings,
            } = result.object || {};

            RatingsStore.getDispatcher().dispatch(RatingsStore.actions['SET_DATA'], ratings || []);

            resolve(ratings);
          }

          else reject(result);
        })
        .catch(e => reject(e));

    });

  }

  loadCompanyFullData = (item) => {

    

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
      query: `query{ 
        company(
          id: ${itemId}
        ) {
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
          comments(limit:0 sort:{by: id, dir:asc}){
            id
            text
            parent
            author_username
            author_fullname
            author_avatar
            createdon
          }
        }
      }`,
    },{
      callback: (data, errors) => {

        let {
          CompaniesStore,
        } = this.state;

        

        if(data.success && data.object){
          // this.setState({
          //   resourcesMap: data.object,
          // });

          const {
            company,
          } = data.object;

          if(company){
            Object.assign(item, company);
            CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['UPDATE'], item);
          }

        }
      },
    });
  }

  // prepareCompaniesLocalData = (item, force) => {

  //   if(!item){
  //     return false;
  //   }

  //   const {
  //     id,
  //   } = item;

  //   return new Promise((resolve, reject) => {

  //     this.localQuery({
  //       operationName: "Company",
  //       variables: {
  //         id,
  //       },
  //     })
  //       .then(result => {
  //         const {
  //           company,
  //         } = result.data || {};

  //         if(company){
  //           Object.assign(item, company);
  //         }

  //         resolve(company);

  //       })
  //       .catch(e => reject(e));

  //   });
  // }

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

    // request.call(this, connector_url, connector_path, params, options);
    return this._request(connector_url, connector_path, params, options);
  }

  _request(connector_url, connector_path, params, options){

    let defaultOptions = {
      showErrorMessage: true,
      callback: null,
      method: 'POST',
    };

    options = options || {};

    options = Object.assign(defaultOptions, options);

    let showErrorMessage = options.showErrorMessage;
    let callback = options.callback;
    let method = options.method;

    let {addInformerMessage} = this.props.documentActions;

    // var body = new FormData();

    var data = {
    };

    if(params){
      Object.assign(data, params);
    }

    // var body = JSON.stringify(data);

    // 

    // var body = params;

    // for(var i in data){

    //   var value = data[i];

    //   if(value === null || value === undefined){
    //     continue;
    //   }

    //   body.append(i, value);
    // };

    fetch(connector_url +'?pub_action=' + connector_path,{
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: method,
      // body: body,
      body: JSON.stringify(data),
    })
    .then(function (response) {

      return response.json()
    })
    .then(function (data) {

      let errors = {};

      if(data.success){
      }
      else{

        if(data.data && data.data.length){

          data.data.map(function(error){
            if(error.msg != ''){
              errors[error.id] = error.msg;
            }
          }, this);
        }

        var error = data.message || "Ошибка выполнения запроса";

        showErrorMessage && 
          addInformerMessage && addInformerMessage({
            text: error,
            autohide: 4000,
          });
      }

      if(callback){
        callback(data, errors);
      }
      
      this.forceUpdate();

    }.bind(this))
    .catch((error) => {
        console.error('Request failed', error);
        if(callback){
          callback(data, {});
        }
      }
    );


    this.forceUpdate();
    return;
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
