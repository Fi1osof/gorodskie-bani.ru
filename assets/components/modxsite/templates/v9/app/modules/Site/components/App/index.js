import './styles/styles.less';

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

import * as proxyActions from 'modules/Redux/actions/proxyActions';
import * as userActions from 'modules/Redux/actions/userActions';
import * as documentActions from 'modules/Redux/actions/documentActions';

import customPropTypes from 'material-ui/utils/customPropTypes';
import { createStyleSheet } from 'jss-theme-reactor';
import { lightBlue } from 'material-ui/styles/colors';

import { connect } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { bindActionCreators } from 'redux';
import { Provider } from "react-redux";

import Grid from 'material-ui/Grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import createPalette from 'material-ui/styles/palette';

import {DataStore, Dispatcher} from 'react-cms-data-view';

import {request, saveItem} from 'react-cms-data-view/src/Utils';

import Informer from 'structor-templates/components/Informer';

import MainMenu from './MainMenu';

import Auth from '../Auth';

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
  execute,
  parse,
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


import {
  buildExecutionContext,
  buildResolveInfo,
  getOperationRootType,
} from 'graphql/execution/execute';

// console.log('buildExecutionContext', buildExecutionContext);

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// const customStyles = createMuiTheme({
//   palette: createPalette({
//   }),
// });

// light.text.primary = '#ffffff';

const customStyles = createMuiTheme({
  palette: createPalette({
    // primary: lightBlue,
  }),
});

const defaultProps = {
  connector_url: '/assets/components/modxsite/connectors/connector.php',
};


let classes;


var styleSheet = createStyleSheet('InteractiveLayout', (theme) => {

  // console.log("classes styleSheet", theme);

  var mobile = theme.breakpoints.down('md');
  var desktop = theme.breakpoints.up('md');
  var xs = theme.breakpoints.down('sm');
  var smMin = theme.breakpoints.up('sm');
  var lgMin = theme.breakpoints.up('lg');


  let SearchBar = {
    // width: 300,
    position: "relative",
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,

    "&.expanded": {
      width: 400,
    },

    "& .textField": {

      "& [type=text]": {
        fontSize: 13,
        backgroundColor: "rgba(255,255,255,0.8)",
        textIndent: 5,
      },

    },
  };

  SearchBar[xs] = {
    "&.expanded": {
      width: "auto",
      right: 0,
    },
  };

  // SearchBarGrid[xs] = {
  //   // width: "100%",
  // };

  var css = {
    SearchBar,
  };

  return css;
});

export class MainApp extends Component{

  static childContextTypes = {
    appExports: PropTypes.object,
    // classes: PropTypes.object,
  };

  getChildContext() {

    // console.log('getChildContext classes', classes);

    let {
      appExports,
    } = this.props;

    let context = {
      appExports,
      // classes,
    };

    return context;
  }

  render(){

    // const {
    //   store,
    //   routes,
    //   render,
    // } = this.props;

    // return <Provider store={store}>
    //   <Router
    //     history={browserHistory}
    //     routes={routes}
    //     render={render}
    //   />
    // </Provider>;

    return this.props.children;

  }

}



/*
  Инициируется один раз
*/
export class AppMain extends Component{

  static contextTypes = {
    // styleManager: customPropTypes.muiRequired,
  };

  static childContextTypes = {
    classes: PropTypes.object,
    connector_url: PropTypes.string,
    location: PropTypes.object,
    request: PropTypes.func,
    apiRequest: PropTypes.func,
    wsRequest: PropTypes.func,
    loadApiData: PropTypes.func,
    openCompanyPage: PropTypes.func,
    user: PropTypes.object,
    userActions: PropTypes.object,
    document: PropTypes.object,
    documentActions: PropTypes.object,
    // prepareCompaniesLocalData: PropTypes.func,
    // loadCompanyFullData: PropTypes.func,
    updateItem: PropTypes.func,
    saveItem: PropTypes.func,
    updateContactItem: PropTypes.func,
    saveContactItem: PropTypes.func,
    updateTopicItem: PropTypes.func,
    setPageTitle: PropTypes.func,
    CoordsStore: PropTypes.object,
    CompaniesStore: PropTypes.object,
    RatingsStore: PropTypes.object,
    ResourcesStore: PropTypes.object,
    TopicsStore: PropTypes.object,
    CommentsStore: PropTypes.object,
    UsersStore: PropTypes.object,
    // CompaniesStore: PropTypes.object,
    // orm: PropTypes.object,
    schema: PropTypes.object,
    // db: PropTypes.object,
    localQuery: PropTypes.func,
    remoteQuery: PropTypes.func,
    getCounters: PropTypes.func,

    coords: PropTypes.object,
    setCoords: PropTypes.func,
    triggerGoal: PropTypes.func,
  };

  getChildContext() {

    let {
      user,
      userActions,
      documentActions,
      document,
      location,
      connector_url,
    } = this.props;

    let {
      CoordsStore,
      CompaniesStore,
      RatingsStore,
      ResourcesStore,
      schema,
      TopicsStore,
      CommentsStore,
      UsersStore,
      coords,
    } = this.state;

    let context = {
      classes,
      location,
      connector_url,
      request: this.request,
      apiRequest: this.apiRequest,
      wsRequest: this.wsRequest,
      loadApiData: this.loadApiData,
      openCompanyPage: this.openCompanyPage,
      // prepareCompaniesLocalData: this.prepareCompaniesLocalData,
      // loadCompanyFullData: this.loadCompanyFullData,
      updateItem: this.updateItem,
      saveItem: this.saveItem,
      updateContactItem: this.updateContactItem,
      saveContactItem: this.saveContactItem,
      updateTopicItem: this.updateTopicItem,
      setPageTitle: this.setPageTitle,
      getCounters: this.getCounters,
      user,
      userActions,
      document,
      documentActions,
      TopicsStore,
      CoordsStore,
      CommentsStore,
      ResourcesStore,
      CompaniesStore,
      RatingsStore,
      UsersStore,
      schema,
      localQuery: this.localQuery,
      remoteQuery: this.remoteQuery,
      coords,
      setCoords: this.setCoords,
      triggerGoal: this.triggerGoal,
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
      CoordsStore: new DataStore(new Dispatcher()),   // Координаты трейсируемых объектов
      CompaniesStore: new DataStore(new Dispatcher()),
      RatingsStore: new DataStore(new Dispatcher()),
      UsersStore: new DataStore(new Dispatcher()),
      CommentsStore: new DataStore(new Dispatcher()),
      ResourcesStore: new DataStore(new Dispatcher()),
      TopicsStore: new DataStore(new Dispatcher()),
      // orm,
      schema,
      // db,
      coords: {},
      // inited: typeof window === "undefined",
      inited: false,
      // appExports: {},
    }

    let {
      user,
      document: {
        stores,
      },
    } = props;

    user.hasPermission = this.hasPermission;

    stores.notifications_store = notifications_store;

    this.rootResolver = rootResolver;

    // console.log('AppMain location', props.location);
  }

  getCounters(){
    const metrika = `<!-- Yandex.Metrika informer -->
      <a href="https://metrika.yandex.ru/stat/?id=26848689&amp;from=informer"
      target="_blank" rel="nofollow"><img src="//bs.yandex.ru/informer/26848689/3_1_FFFFFFFF_EFEFEFFF_0_pageviews"
      style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" onclick="try{Ya.Metrika.informer({i:this,id:26848689,lang:'ru'});return false}catch(e){}"/></a>
      <!-- /Yandex.Metrika informer -->
    `;

    return <Grid
      container
      gutter={0}
      align="center"
      style={{
        // paddingLeft: 15,
      }}
    >

      <Grid
        item
      >

        {typeof window !== "undefined" && <div dangerouslySetInnerHTML={{__html: metrika}}></div>}  
        
      </Grid>

      {/*<Grid
        item
      >

        <a href="http://modxclub.ru" target="_blank" title="Разработка сайтов и интернет-магазинов на MODX Revolution"><img src="assets/images/site/logos/modx_h30.jpg" /></a>
        
      </Grid>*/}
      
    </Grid>;
  }


  // Достижение цели
  triggerGoal(goal){

    if(typeof window !== "undefined"){

      const {
        yaCounter26848689,
      } = window;

      yaCounter26848689 && yaCounter26848689.reachGoal(goal);

    }

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
      mutation: Mutation,
    });

  }

  setCoords = (coords) => {

    this.setState({
      coords,
    });

  };

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

    // console.log('localQuery', graphQLParams);

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

    // console.log('graphQLParams', graphQLParams);

    // return new Promise(resolve => resolve([{}]));

    return new Promise((resolve, reject) => {

      // class user {

      //   constructor(props){

      //     Object.assign(this, props);
      //   }

      // }

      const {
        ContactsStore,
        PlacesStore,
        PlaceContactsStore,
      } = this.state;

      graphql({
        schema,
        operationName,
        source: query || defaultQuery,
        // rootValue: {
        //   contacts: ContactsStore.getState(),
        //   places: PlacesStore.getState(),
        //   contact_places: PlaceContactsStore.getState(),
        // },
        variableValues: variables || undefined,
        // contextValue: this.getChildContext(),
        contextValue: this,
        fieldResolver: rootResolver,
      }).then((result) => {

        

        let {
          errors,
        } = result;

        if(errors && errors.length){
          let {
            message,
            ...other
          } = errors[0];

          return reject(message, {...other});
        }

        resolve(result);
      })
      .catch(e => {
        console.error(e);
        reject(e);
      });

      // resolve({
      //   data: {},
      // });
    });
  }

  // localQuery = (graphQLParams) => {

  //   const {
  //     schema,
  //   } = this.state;

  //   // var schema = this._getSchema();


  //   // console.log('app localQuery', graphQLParams);

  //   // 

  //   // return {};

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

  //   // 

  //   // return new Promise(resolve => resolve([{}]));

  //   // return new Promise((resolve, reject) => {

  //   //   const {
  //   //     // ContactsStore,
  //   //     // PlacesStore,
  //   //     // PlaceContactsStore,
  //   //   } = this.state;

  //     // graphql({
  //     //   schema,
  //     //   operationName,
  //     //   source: query || defaultQuery,
  //     //   // rootValue: undefined,
  //     //   variableValues: variables || undefined,
  //     //   // contextValue: this.getChildContext(),
  //     //   contextValue: this,
  //     //   fieldResolver: rootResolver,
  //     //   // directives: rootDirectives,
  //     // }).then((result) => {

  //     //   let {
  //     //     errors,
  //     //   } = result;

  //     //   if(errors && errors.length){
  //     //     let {
  //     //       message,
  //     //       ...other
  //     //     } = errors[0];

  //     //     console.error("localQuery error", result);
  //     //     return reject(message, {...other});
  //     //   }

  //     //   resolve(result);
  //     // })
  //     // .catch(e => {
  //     //   console.error("localQuery error", e);
  //     //   reject(e);
  //     // });

  //     let 
  //       // schema,
  //       // operationName,
  //       source = query || defaultQuery,
  //       document = parse(source),
  //       rootValue = undefined,
  //       variableValues = variables || undefined,
  //       // contextValue: this.getChildContext(),
  //       contextValue = this,
  //       fieldResolver = rootResolver
  //       // directives: rootDirectives,
  //       ;

  //     // console.log("execute document", document);

  //     let result = execute(
  //       schema,
  //       document,
  //       rootValue,
  //       contextValue,
  //       variableValues,
  //       operationName,
  //       fieldResolver
  //     );

  //     // console.log("execute result", result);

  //     return result;


  //     // let executionContext = buildExecutionContext(
  //     //   schema,
  //     //   document,
  //     //   rootValue,
  //     //   contextValue,
  //     //   variableValues,
  //     //   operationName,
  //     //   fieldResolver
  //     // )

  //     // console.log("buildExecutionContext executionContext", executionContext);


  //     // const type = getOperationRootType(executionContext.schema, executionContext.operation);


  //     // console.log("getOperationRootType type", type);

  //     // return {
  //     //   data: {},
  //     // };

  //     // const {
  //     //   contextValue: context,
  //     //   rootValue: nodeSource,
  //     //   fieldResolver: resolver,
  //     // } = executionContext;

  //     // let resolveInfo = buildResolveInfo(executionContext);

  //     // result = resolver(nodeSource, variables, context, executionContext);

  //     // console.log("execute result", result);

  //     // console.log("execute promise.resolve", result.resolve);

  //     // result
  //     //   .then(r => {
          
  //     //     console.log("execute result 2", r);

  //     //     resolve(r);

  //     //   })
  //     //   .catch(e => reject(e));

  //   // });
  // }



  // remoteQuery = (query, variables) => {
  remoteQuery = (graphQLParams) => {

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


  componentWillMount(){

    let {
      CoordsStore,
      CompaniesStore,
      RatingsStore,
    } = this.state;

    CoordsStore.getDispatcher().register(payload => {

      this.forceUpdate();
    });

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

  componentDidMount(){
  }

  componentDidUpdate(prevProps, prevState){


    // console.log("this.props", this.props);
    // console.log("prevProps", prevProps);

    let {
      user: {
        user,
        // own_data_requested,
      }
    } = this.props;

    let {
      user: {
        user: prevUser,
        // own_data_requested: prev_own_data_requested,
      }
    } = prevProps;

    const {
      inited,
    } = this.state;

    // // 

    // // 
    
    // // Если пользователь авторизовался, то перезагружаем данные зависимые
    
    if(
      inited && user && (!prevUser || user.id != prevUser.id)
    ){
      this.loadApiData();
    }
  }


  initUser(user){

    this.initWebSocket(user);

    /*
      Если пользователь есть и имеет права смотреть координаты,
      запускаем службу
    */
    if(user){

      // console.log('initUser', user);

      const {
        user: propsUser,
      } = this.props;

      // if(propsUser.hasPermission("viewCoords")){
      if(user.id === 2){

        this.traceCoords();

        setInterval(() => this.traceCoords(), 30000);

      }

    }

  }

  traceCoords = () => {

    this.remoteQuery({
      operationName: "WsConnections",
      variables: {
        wsConnectionGetCoords: true,
      },
    })
    .then(r => {

      let CoordsStoreState = this.state.CoordsStore.getState();

      // console.log("traceCoords", r);

      let {
        ws_connections,
      } = r.object && r.object || {}

      if(ws_connections && ws_connections.length){

        const dispatcher = this.state.CoordsStore.getDispatcher();

        ws_connections.map(ws_connection => {

          const {
            id,
          } = ws_connection;

          let item = CoordsStoreState.find(n => n.id === id);

          if(item){
            dispatcher.dispatch(this.state.CoordsStore.actions.UPDATE, item, ws_connection);
          }
          else{
            dispatcher.dispatch(this.state.CoordsStore.actions.CREATE, ws_connection);
          }

        });

      }

      // delete CoordsStoreState;

    })
    .catch(e => {
      console.error(e);
    });

  }


  initWebSocket(user){


    return new Promise((resolve, reject) => {


      if(typeof window === 'undefined'){
        return resolve();
      }

      const protocol = (document.location.protocol == "https:") ? "wss" : "ws";

      const ws = new WebSocket(`${protocol}://${window.location.host}/api/?${user ? `uid=${user.id}` : ''}`);  

      if(typeof window !== 'undefined'){
        window.ws = ws;
      }

      this.state.ws = ws;

      ws.onmessage = (message) => {

        console.log('new ws message', message);

        if (ws.readyState == ws.OPEN) {
          
          try{

            message = JSON.parse(message.data);



            switch (message.type) {

              case 'chat_message':

                if (message.object && message.object.id) {
                  var messages = this.state.messages;
                  var msg = message.object;
                  // messages.push(msg);

                  // console.log('new ws msg', msg);

                  // Если есть текущий диалог, добавляем в него
                  // if(
                  //   msg.dialogue_id
                  //   && this.state.dialogues
                  //   && this.state.dialogues.length
                  // ){
                  //   this.state.dialogues.map((dialog) => {
                  //     if(dialog.id == msg.dialogue_id){
                  //       dialog.lastmsg = `${msg.sender_firstname}: ${msg.text}`;
                  //     }
                  //   });
                  // }

                  // this.setState({
                  //   messages: messages,
                  // });
                }

                break;

              case 'newDialogMessage':

                this.getUserInfo();

                break;

              // Сообщение было отмечено как прочтенное, перегружаем его
              case 'dialog_message_is_readed':

                let {
                  text: message_id,
                } = message;

                message_id = parseInt(message_id);

                if(message_id){

                  this.reloadMessage({
                    message_id,
                  });
                  
                }

                break;

              default:;
            }

            // console.log('ws onmessage', message);

          }
          catch(e){
            console.error(e);
          }
        }
      }

      ws.onopen = () => {
        
        // console.log('ws onopen');
        
        // this.setState({
        //   need_send_user_data: true,
        // });

        resolve(ws);
      }

      ws.onerror = (error) => {
        console.error('ws Connection error', error);

        reject(error);
      }

      ws.onclose = function () {
        // console.log('ws Connection closed');
      }


    });

  }


  wsRequest = (message) => {

    const {
      ws,
    } = this.state;

    if(!ws || ws.readyState !== ws.OPEN){
      return false
    }

    try{
      ws.send(JSON.stringify(message));
    }
    catch(e){
      console.error(e);
    }

    return true;
  }



  setPageTitle = (title) => {

    if(title && !/Городские бани/u.test(title)){
      title += " | Городские бани";
    }

    if(
      typeof window !== "undefined"
      && (window.document.title != title)
    ){
      window.document.title = title;
    }
  }

  // updateItem = (item, data, store) => {

  //   if(!item){
  //     console.error("Не указан объект");
  //     return false;
  //   }

  //   if(!store){
  //     console.error("Не указано хранилище");
  //     return false;
  //   }

  //   let newState = {};

  //   Object.assign(newState, data);

  //   let _isDirty = {};

  //   item._isDirty && Object.assign(_isDirty, item._isDirty);

  //   Object.assign(_isDirty, newState);

  //   newState._isDirty = _isDirty;

  //   store.getDispatcher().dispatch(store.actions['UPDATE'], item, newState);

  //   return;
  // }

  // silent - Тихое обновление, без указания изменнных колонок
  updateItem = (item, data, store, silent) => {

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

    if(!silent){
      
      let _isDirty = {};

      item._isDirty && Object.assign(_isDirty, item._isDirty);

      Object.assign(_isDirty, newState);

      newState._isDirty = _isDirty;

    }

    store.getDispatcher().dispatch(store.actions['UPDATE'], item, newState);

    return;
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
      if(/^\_/.test(i)){
        continue;
      }

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

  updateContactItem = (item, data, silent) => {

    let {
      CompaniesStore,
    } = this.state;

    // if(data.coords){
    //   Object.assign(data, data.coords);
    // }

    // 

    // 
    // 


    this.updateItem(item, data, CompaniesStore, silent);
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

      if(data.success && data.object){

        const {
          id,
          uri,
        } = data.object;

        if(id !== itemId){

          // const uri = `/bani/${id}/`;
          
          browserHistory.replace(uri);
        }

        this.reloadApiData();

        return;
      }
    }

    return this.saveItem(store, item, 'companies/', callback);
  }



  updateTopicItem = (item, data, silent) => {

    let {
      TopicsStore,
    } = this.state;

    item = item && TopicsStore.getState().find(n => n.id === item.id);

    if(!item){
      throw(new Error("Не был получен объект топика"));
    }

    this.updateItem(item, data, TopicsStore, silent);
  }


  // loadApiData = async () => {

  //   let user;

  //   await this.remoteQuery({
  //     operationName: "apiData",
  //     variables: {
  //       limit: 0,
  //     },
  //   })
  //   .then(data => {

  //     // console.log('loadCompanies', data);

  //     let {
  //       CompaniesStore,
  //       RatingsStore,
  //       UsersStore,
  //       CommentsStore,
  //       ResourcesStore,
  //       TopicsStore,
  //     } = this.state;

  //     // 

  //     if(data.success && data.object){
  //       let {
  //         companies,
  //         user: currentUser,
  //         users,
  //         ratings,
  //         comments,
  //         resources,
  //         topics,
  //       } = data.object || {};

  //       if(currentUser){
  //         this.props.userActions.GetOwnDataSuccess(currentUser);

  //         user = currentUser;
  //       }

  //       // let companies = object && object.map(n => new Company(n)) || [];
  //       companies = companies &&  companies.map(n => this.createStoreObject(Company, n)) || [];
  //       users = users && users.map(n => this.createStoreObject(User, n)) || [];
  //       ratings = ratings || [];
  //       comments = comments || [];

  //       CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['SET_DATA'], companies);
  //       UsersStore.getDispatcher().dispatch(UsersStore.actions['SET_DATA'], users);
  //       RatingsStore.getDispatcher().dispatch(RatingsStore.actions['SET_DATA'], ratings || []);
  //       CommentsStore.getDispatcher().dispatch(CommentsStore.actions['SET_DATA'], comments || []);
  //       ResourcesStore.getDispatcher().dispatch(ResourcesStore.actions['SET_DATA'], resources || []);
  //       TopicsStore.getDispatcher().dispatch(TopicsStore.actions['SET_DATA'], topics || []);

  //       // Устанавливаем сразу локальные данные для компаний
  //       // companies.map(n => {
  //       //   this.prepareCompaniesLocalData(n);
  //       // });
  //     }
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   });

  //   this.initUser(user);

  //   // this.forceUpdate();

  //   this.setState({
  //     inited: true,
  //   });
  // }


  loadApiData = () => {

    // 

    const {
      document,
    } = this.props;

    let {
      apiData,
    } = document;

    if(typeof window !== "undefined"){

      // const response = await this.remoteQuery({
      //   operationName: "apiData",
      //   variables: {
      //     limit: 0,
      //   },
      // });

      this.remoteQuery({
        operationName: "apiData",
        variables: {
          limit: 0,
        },
      })
      .then(r => {

        document.apiData = apiData = r && r.object || null;

        this.initData(apiData);

        // Если работа уже в браузере, надо переподгрузить данные карты,
        // потому что с рейтингами фигня какая-то на стороне сервере 
        // Скорее всего просто сравнение неверное по ключу
        // this.loadMapData();

      });

      // console.log("ApiData response", response);

    }
    else{

      this.initData(apiData);

    }

    return;
  }


  initData(apiData){

    let {
      CompaniesStore,
      RatingsStore,
      UsersStore,
      CommentsStore,
      ResourcesStore,
      TopicsStore,
    } = this.state;

    let user; 

    if(apiData){
      let {
        companies,
        user: currentUser,
        users,
        ratings,
        comments,
        resources,
        topics,
      } = apiData || {};

      if(currentUser){
        this.props.userActions.GetOwnDataSuccess(currentUser);

        user = currentUser;
      }

      // let companies = object && object.map(n => new Company(n)) || [];

      companies = companies &&  companies.map(n => this.createStoreObject(Company, n)) || [];
      users = users && users.map(n => this.createStoreObject(User, n)) || [];

      // companies = companies || [];
      // users = users || [];

      ratings = ratings || [];
      comments = comments || [];

      CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['SET_DATA'], companies);
      UsersStore.getDispatcher().dispatch(UsersStore.actions['SET_DATA'], users);
      RatingsStore.getDispatcher().dispatch(RatingsStore.actions['SET_DATA'], ratings || []);
      CommentsStore.getDispatcher().dispatch(CommentsStore.actions['SET_DATA'], comments || []);
      ResourcesStore.getDispatcher().dispatch(ResourcesStore.actions['SET_DATA'], resources || []);
      TopicsStore.getDispatcher().dispatch(TopicsStore.actions['SET_DATA'], topics || []);

      // Устанавливаем сразу локальные данные для компаний
      // companies.map(n => {
      //   this.prepareCompaniesLocalData(n);
      // });

      // console.log("MapCompanies CompaniesStore 2", CompaniesStore.getState());
    }


    this.initUser(user);

    // this.forceUpdate();

    this.setState({
      inited: true,
    });

  }


  // Перезагружаем API-данные со сбросом кеша
  reloadApiData = async () => {

    await this.remoteQuery({
      operationName: "clearCache",
    });

    return this.loadApiData();
  }

  // loadMapData(){
    

  //  // 

  //   // this.setState({
  //   //   // clusters: this.state.mapOptions.bounds
  //   //   clusters: this.state.bounds
  //   //     ? this.getClusters(props)
  //   //     : null,
  //   // });

  //   // const {
  //   //   // CompaniesStore,
  //   //   localQuery,
  //   // } = this.context;

  //   const {
  //     CompaniesStore,
  //   } = this.state;

  //   // let {
  //   //  // mapOptions: {
  //   //  //  zoom,
  //   //  // },
  //   //  zoom,
  //   // } = this.state;

  //   // let {
  //   // } = this.context;

  //   let companies;

  //   this.localQuery({
  //     operationName: "MapCompanies",
  //     variables: {
  //       limit: 0,
  //       "companyIds": [1275, 1542, 1259],
  //     },
  //   })
  //   .then(r => {

  //     console.log("Map companies", r);

  //     const {
  //       companies,
  //     } = r.data || {};

  //     // companies = result;

  //     if(companies){
  //       this.props.document.mapData.companies = companies;
  //       this.forceUpdate();
  //     }

  //     // const StoreState = CompaniesStore.getState();

  //     // companies && StoreState.map(item => {

  //     //   const company = companies.find(n => n.id === item.id);

  //     //   if(company){
  //     //     Object.assign(item, company);
  //     //   }

  //     // });

  //     // this.prepareClusters(companies);

  //     this.forceUpdate();

  //   })
  //   .catch(e => {
  //     console.error('MapCompanies', e);
  //   });
  
  //   return;

  // }


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

  // loadCompanyFullData = (item) => {

    

  //   if(!item){
  //     return false;
  //   }

  //   const {
  //     id,
  //   } = item;

  //   const itemId = parseInt(id);

  //   if(!itemId){
  //     return false;
  //   }

  //   this.apiRequest('company', true, 'graphql', {
  //     query: `query{ 
  //       company(
  //         id: ${itemId}
  //       ) {
  //         id
  //         name
  //         longtitle
  //         description
  //         content
  //         alias
  //         uri
  //         city
  //         coords {
  //           lat
  //           lng
  //         }
  //         image {
  //           thumb
  //           small
  //           big
  //           marker_thumb
  //         }
  //         gallery {
  //           image {
  //             thumb
  //             small
  //             middle
  //             big
  //           }
  //         }
  //         tvs {
  //           address
  //           site
  //           facility_type
  //           phones
  //           work_time
  //           prices
  //           metro
  //         }
  //         ratingsByType {
  //           rating
  //           max_vote
  //           min_vote
  //           type
  //           quantity
  //           quantity_voters
  //         }
  //         votes {
  //           rating
  //           type
  //         }
  //         comments(limit:0 sort:{by: id, dir:asc}){
  //           id
  //           text
  //           parent
  //           author_username
  //           author_fullname
  //           author_avatar
  //           createdon
  //         }
  //       }
  //     }`,
  //   },{
  //     callback: (data, errors) => {

  //       let {
  //         CompaniesStore,
  //       } = this.state;

        

  //       if(data.success && data.object){
  //         // this.setState({
  //         //   resourcesMap: data.object,
  //         // });

  //         const {
  //           company,
  //         } = data.object;

  //         if(company){
  //           Object.assign(item, company);
  //           CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions['UPDATE'], item);
  //         }

  //       }
  //     },
  //   });
  // }

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

    return user.sudo === true || (user.policies && user.policies[perm]) || false;
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

  _request = (connector_url, connector_path, params, options) => {

    let defaultOptions = {
      showErrorMessage: true,
      callback: null,
      method: 'POST',
    };

    const {
      documentActions,
    } = this.props;

    options = options || {};

    options = Object.assign(defaultOptions, options);

    let showErrorMessage = options.showErrorMessage;
    let callback = options.callback;
    let method = options.method;

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

    return new Promise((resolve, reject) => {

      const request = fetch(connector_url +'?pub_action=' + connector_path,{
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
      .then( (data) => {

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

          showErrorMessage && documentActions.addInformerMessage({
            text: error,
            autohide: 4000,
          });

        }

        if(callback){
          callback(data, errors);
        }
        
        this.forceUpdate();

        if(data.success){
          resolve(data);
        }
        else{
          reject(data);
        }

        return;
      })
      .catch((error) => {
          console.error('Request failed', error);
          
          showErrorMessage && documentActions.addInformerMessage({
            text: "Ошибка выполнения запроса",
            autohide: 4000,
          });

          if(callback){
            callback(data, {});
          }

          reject(error);
        }
      );


      this.forceUpdate();

    });
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
      // document,
      // appExports,
      ...other
    } = this.props;

    // if(!document.mapData){
    //   return null;
    // }

    let {
      // inited,
      notifications_store,
    } = this.state;
 
    const inited = true;

    let authOpen = user && user.loginModalOpened || false;

    return <MuiThemeProvider theme={customStyles}>
      <Renderer 
        inited={inited}
        children={children}
        authOpen={authOpen}
        notifications_store={notifications_store}
        // appExports={appExports}
      />
    </MuiThemeProvider>

    ;
  }
}


class Renderer extends Component{


  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
    appExports: PropTypes.object.isRequired,
  }



  componentWillMount(){
  
    classes = this.context.styleManager.render(styleSheet);

    // console.log('classes', classes, styleSheet);

    const {
      styleManager,
    } = this.context;

    let {
      appExports,
    } = this.context;

    // if(typeof window == "undefined"){
      // For render css on server-side
      if(appExports){

        appExports.theme = styleManager;

      }
    // }
  }

  render(){

    const {
      inited,
      children,
      authOpen,
      notifications_store,
    } = this.props;

    // let {
    //   appExports,
    // } = this.props;

    return <div
      className="MainApp"
    >
      <MainMenu 
      />

      <div 
        id="Module"
      >
        {inited
          ? 
            children
          : 
          <div 
            className="preloader"
          />
        }
      </div>


      <Auth 
        open={authOpen}
      />

      <Informer
        store={notifications_store}
      />  

    </div>;
  }
}

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
