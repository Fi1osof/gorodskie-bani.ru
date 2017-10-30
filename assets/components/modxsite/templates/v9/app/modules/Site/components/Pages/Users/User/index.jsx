import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';

import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import Badge from 'material-ui/Badge';

// import WorksList from '../works/list';

import {Link} from 'react-router';

import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Avatar from 'modules/Site/components/fields/User/avatar.js';
// import CompaniesList from '../../fields/user/companies_list';
// import ServicesList from '../../fields/user/services_list';

import CommunicationEmail from 'material-ui-icons/Email';
import CalendarIcon from 'material-ui-icons/Today';
import KeyIcon from 'material-ui-icons/VpnKey';
import FirmIcon from 'material-ui-icons/Store';
import AddIcon from 'material-ui-icons/AddCircleOutline';

// import * as userActions from '../../redux/actions/userActions';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import Snackbar from '../../snackbar';

import Field from './fields/';
// import Payment from './payment/';

const Dropzone = require('react-dropzone');

const styleSheet = createStyleSheet('SwitchListSecondary', (theme) => ({
  root: {
  },
  Switch: {
    flex: 'none',
  },
}));

var classes;
 
// let moment = require('moment');

import 'moment/src/locale/ru';
import moment from 'moment';
// moment.locale('ru');

// import Layout from '../../layout';

// const contextTypes = Object.assign({
//   request: PropTypes.func.isRequired,
//   // setPagetitle: PropTypes.func.isRequired,
//   styleManager: customPropTypes.muiRequired,
// }, Layout.contextTypes || {});

// const propTypes = Object.assign({
//   // user: PropTypes.object.isRequired,
//   username: PropTypes.string.isRequired,
// }, Layout.propTypes || {});

// const defaultProps = Object.assign({
//   inEditMode: false,
//   isDirty: false,
//   allowEdit: true,
// }, Layout.defaultProps || {});

const contextTypes = Object.assign({
  user: PropTypes.object.isRequired,
  UsersStore: PropTypes.object.isRequired,
  CommentsStore: PropTypes.object.isRequired,
  localQuery: PropTypes.func.isRequired,
  remoteQuery: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  documentActions: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  saveCurrentUser: PropTypes.func.isRequired,

  request: PropTypes.func.isRequired,
  localQuery: PropTypes.func.isRequired,
  connector_url: PropTypes.string.isRequired,
  // setPagetitle: PropTypes.func.isRequired,
  styleManager: customPropTypes.muiRequired,
}, {});

const propTypes = Object.assign({
  username: PropTypes.string.isRequired,
}, {});

const defaultProps = Object.assign({
  inEditMode: false,
  isDirty: false,
  allowEdit: true,
}, {});


export default class User extends Component {


  static contextTypes = contextTypes;

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  // state = {}

  constructor(props){
    super(props);

    this.state = {};

    // if(props.document && props.document.document && props.document.document.data){
    //   let user_data = props.document.document.data;
    //   this.state = {
    //     // initialized: user_data.id,
    //     // requested_id: props.document.document.user_id,
    //     allowEdit: props.allowEdit,
    //     inEditMode: props.inEditMode,
    //     id: user_data.id,
    //     username: user_data.username,
    //     fullname: user_data.fullname,
    //     email: user_data.email,
    //     photo: user_data.photo,
    //     regdate: user_data.regdate,
    //     // api_key: user_data.api_key,

    //   }
    // }

    // let {
      
    //   user: current_user 
    // } = props;


    // Object.assign(this.state, {
    //   current_user: current_user || {},
    // });

    return;
  }

  componentWillMount(){

    /*
    * Если нет данных пользователя, но известен ID,
    * запрашиваем данные с сервера
    * */
    // if(
    //   !this.state.initialized
    //   && !this.state.id
    //   && this.state.requested_id
    // ){
    //   this.initialize();
    // }

    classes = this.context.styleManager.render(styleSheet);

    return;
  }



  componentDidMount(){

    const {
      UsersStore,
      CommentsStore,
    } = this.context;

    this.UsersStoreListener = UsersStore.getDispatcher().register(payload => {

      this.loadData();

    });

    this.CommentsStoreListener = CommentsStore.getDispatcher().register(payload => {

      this.loadData();

    });

    this.loadData();

    this.processAction();

    super.componentDidMount && super.componentDidMount();
  }

  componentWillUnmount(){

    const {
      UsersStore,
      CommentsStore,
    } = this.context;



    if(this.UsersStoreListener){

      let dispatch = UsersStore.getDispatcher();

      dispatch._callbacks[this.UsersStoreListener] && dispatch.unregister(this.UsersStoreListener);

      this.UsersStoreListener = undefined;
    }

    if(this.CommentsStoreListener){

      let dispatch = CommentsStore.getDispatcher();

      dispatch._callbacks[this.CommentsStoreListener] && dispatch.unregister(this.CommentsStoreListener);

      this.CommentsStoreListener = undefined;
    }

  }


  loadData(){


    const {
      localQuery,
    } = this.context;

    const {
      username,
    } = this.props;

    // console.log('username', username);

    if(!username){
      return;
    }

    let result = localQuery({
      operationName: "User",
      variables: {
        username,
        // usersPage: page,
        // withPagination: true,
        userGetComments: true,
        getImageFormats: true,
        // resourcesLimit: 10,
        // resourceGetAuthor: true,
        // resourceGetComments: true,
        getCommentAuthor: true,
      },
    })
    .then(r => {

      // console.log("User r", r);

      const {
        user,
      } = r.data;

      // const {
      //  count,
      //  total,
      //  object: users,
      // } = usersList || {};

      this.setState({
        user,
      });
    }); 

    // console.log("Resources r", result);
    
    
  }

  
  processAction(){

    if(typeof window === "undefined"){
      return;
    }

    const {
      params: {
        action,
      },
    } = this.context.router;

    switch(action){

      case "activation":

        this.processActivation();

        break;

      default:;

    }


  }

  // Активация пользователя
  processActivation(){

    const {
      params: {
        action,
      },
      location,
    } = this.context.router;

    const {
      request,
    } = this.context;

    const {
      username,
    } = this.props;

    const {
      k: key,
    } = location.query || {};

    request("activation", false, "users/activate", {
      username,
      key,
    }, {

      callback: (data, errors) => {

        console.log("activation result", data, errors);

        const {
          success,
          message,
        } = data;

        if(success){

          const {
            userActions,
            documentActions,
          } = this.context;

          documentActions.addInformerMessage({
            type: "success",
            text: message || "Пользователь успешно активирован",
            autohide: 5000,
          });

          browserHistory.replace(`/profile/${username}`);
          
          userActions.GetOwnData();

        }

      },

    });

  }
 

  // setPagetitle(){
    
    
  //   let {
  //     setPagetitle,
  //   } = this.context;

  //   let {
  //     fullname,
  //     username,
  //   } = this.state; 

  //   setPagetitle( fullname || username || "Профиль пользователя");
  // }


  // initialize(){
  //   var body = new FormData();

  //   body.append("id", this.state.requested_id);

  //   let action = 'users/getdata';

  //   var headers = new Headers();

  //   let CONNECTOR_URL = 'assets/components/modxsite/connectors/connector.php';

  //   fetch(CONNECTOR_URL +'?pub_action=' + action,{
  //     credentials: 'same-origin',
  //     headers: headers,
  //     method: "POST",
  //     body: body,
  //   })
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (data) {

  //       if(data.success && data.object){

  //         var newState = {
  //           initialized: true,
  //           id: data.object.id,
  //           username: data.object.username,
  //           fullname: data.object.fullname,
  //           email: data.object.email,
  //           photo: data.object.photo,
  //           regdate: data.object.regdate,
  //           api_key: data.object.api_key,
  //         };

  //         // if(data.object){
  //         //   for(var i in data.object){
  //         //     newState[i] = data.object[i];
  //         //   }
  //         // }

  //         // this.clearEditedData(newState);

  //         this.setState(newState);
  //       }
  //       else{

  //         var newState = {
  //           initialized: true,
  //           ShowStatusMessage: true,
  //           StatusMessage: data.message || "Ошибка выполнения запроса",
  //           StatusMessageDuration: 7000,
  //         };

  //         var errors = [];

  //         if(data.data){
  //           data.data.map(function(item){
  //             errors.push(item.msg);
  //           });

  //           newState.StatusMessage += "; " + errors.join(", ");
  //         }

  //         this.setState(newState);
  //       }
  //     }.bind(this))
  //     .catch(function (error) {
  //         console.log('Request failed', error);
  //       }
  //     );
  // }

  // componentWillReceiveProps(nextProps){

  //   var newState;

  //   let {
  //     user,
  //   } = nextProps;

  //   // console.log('nextProps.user', user, nextProps);

  //   if(
  //     (user && user !== this.props.user)
  //     ||
  //     (!user && this.props.user)
  //   ){
  //     this.setState({
  //       current_user: user && user.id > 0 && user || {},
  //     });
  //     return false;
  //   }

  //   // if(nextProps.document.document.user_id && nextProps.document.document.user_id != this.state.requested_id){
  //   //   this.state.requested_id = nextProps.document.document.user_id;
  //   //   this.initialize();
  //   // }
  //   // else if(nextProps.document.document.data && nextProps.document.document.data.id != this.state.id){
  //   //   newState = nextProps.document.document.data;
  //   //   Object.assign(newState, {
  //   //     inEditMode: false,
  //   //     email: newState.email,
  //   //     api_key: newState.api_key,
  //   //     photo: newState.photo,
  //   //   });
  //   // }
  //   // else if(nextProps.user.id && nextProps.user.id != this.state.id){
  //   /*
  //   Если пользователь авторизовался, и это его карточка,
  //   то накладываем свойства
  //   * */
  //   // else if(
  //   //   nextProps.user.id
  //   //   && nextProps.user.id != this.props.user.id
  //   //   && nextProps.user.id == this.state.id
  //   // ){
  //   //   newState = {};
  //   //   Object.assign(newState, nextProps.user);
  //   // }

  //   if(newState){
  //     this.clearEditedData(newState);
  //   }

  //   return true;
  // }

  // shouldComponentUpdate(nextProps, nextState){
  //
  //   return true;
  // }

  onHandleEmail(email){
    window.location.href = 'mailto:'+ email;
  }

  editProfile(){
    this.setState({
      inEditMode: true,
    });
  }


  CancelEditProfile(){
    this.clearEditedData({
      inEditMode: false,
    });
  }

  clearEditedData(state){
    var newState = {}

    if(state){
      Object.assign(newState, state);
    }

    for(var i in this.state){
      if(/^new_/.test(i)){
        newState[i] = undefined;
      }
    }

    this.setState(newState);
  }

  onFieldChange(field, state){ 

    let newState = {};
    let newUserState = {};

    var value;

    switch(field){
 
      default: value = state.getCurrentContent().getFirstBlock().text;
    }

    // newState["new_" + field] = value;
    // newState["new_" + field] = value;
    newUserState[field] = value;

    // Обновляем текущего пользователя
    // let{
    //   data: user,
    // } = this.props.document.document;

    // Object.assign(user, newUserState);

    // this.updateState(newState);

    this.updateCurrentUser(newUserState);
  }

  // updateState(newState){

  //   newState.isDirty = true;

  //   this.setState(newState);
  // }

  shouldComponentUpdate(nextProps, nextState){

    if(typeof window != "object"){
      return false;
    }

    return true;
  }

  // Save(){

  //   var body = new FormData();

  //   for(var i in this.state){
  //     if(/^new_/.test(i)){
  //       var value = this.state[i];

  //       if(typeof value == "undefined"){
  //         continue;
  //       }

  //       if(value == null){
  //         value = "";
  //       }

  //       body.append(i.replace(/^new_/, ''), value);
  //     }
  //   }

  //   let action = 'user/own_profile/update';

  //   var headers = new Headers();

  //   let CONNECTOR_URL = 'assets/components/modxsite/connectors/connector.php';

  //   fetch(CONNECTOR_URL +'?pub_action=' + action,{
  //     credentials: 'same-origin',
  //     headers: headers,
  //     method: "POST",
  //     body: body,
  //   })
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (data) {

  //       if(data.success){



  //         // Обновляем текущего пользователя
  //         let{
  //           data: user,
  //         } = this.props.document.document;

  //         Object.assign(user, data.object);


  //         var newState = {
  //           isDirty: false,
  //           inEditMode: false,
  //           ShowStatusMessage: true,
  //           StatusMessage: data.message || "Профиль успешно обновлен",
  //           StatusMessageDuration: 3000,
  //         };

  //         if(data.object){
  //           for(var i in data.object){
  //             newState[i] = data.object[i];
  //           }
  //         }

  //         this.clearEditedData(newState);

  //         this.props.userActions.GetOwnData();



  //       }
  //       else{

  //         var newState = {
  //           ShowStatusMessage: true,
  //           StatusMessage: data.message || "Ошибка выполнения запроса",
  //           StatusMessageDuration: 7000,
  //         };

  //         var errors = [];

  //         if(data.data){
  //           data.data.map(function(item){
  //             errors.push(item.msg);
  //           });

  //           newState.StatusMessage += "; " + errors.join(", ");
  //         }

  //         this.setState(newState);
  //       }
  //     }.bind(this))
  //     .catch(function (error) {
  //         console.log('Request failed', error);
  //       }
  //     );
  // }

  async Save(){

    const {
      saveCurrentUser,
    } = this.context;

    const {
      user,
    } = this.state;

    await saveCurrentUser(user)
    .then(r => {
      // console.log('saveCurrentUser result', r);

      this.setState({
        inEditMode: false,
      });

    })
    .catch(e => {
      console.error(r);
    });

    this.forceUpdate();

  }

  onDrop (files) { 

    var dz = this.refs.dropzone;

    var file = files[0]
    var fr = new window.FileReader()
 
    dz.setState({
      loadingImage: true
    })


    let scope = this;

    fr.onload = (data) => {
      const base64 = data.currentTarget.result
 

      if (base64.length > 3000000) {
        let confirmation = window.confirm('Изображение слишком большое (более 3Мб), точно загрузить его?')

        if (!confirmation) {
          dz.setState({
            loadingImage: false
          })
          return;
        }
      }

      this.uploadImageCallBack(file);

      // this.setState({
      //   new_photo: base64,
      //   ShowPhotoMessage: true,
      //   PhotoMessageText: "Фото изменено",
      // });

      // this.updateCurrentUser({
      //   photo: base64,
      // });

      // base64ImageToRGBMatrix(base64, (err, data) => {
      //   if (err) return console.error(err)
      //
      //   this.setState({
      //     rgbMatrix: data,
      //     loadingImage: false
      //   })
      // })
    }
    fr.readAsDataURL(file)
  }


  uploadImageCallBack = (file) => { 

    // let {
    //   // store,
    //   item,
    // } = this.props;

    let {
      connector_url,
      localQuery,
    } = this.context;

    // const {
    //   id,
    // } = item;

    return new Promise(
      (resolve, reject) => { 

        var body = new FormData(); 

        body.append('file', file);

        fetch(connector_url +'?pub_action=images/upload',{
          credentials: 'same-origin',
          method: "POST",
          body: body,
        })
          .then(function (response) {
            return response.json()
          })
          .then( (data) => { ;

            if(data.success){ 

              if(data.object && data.object.url){

                let link = data.object.url;

                resolve({
                  data: { 
                    link: link,
                  } 
                }); 
 

                // console.log('uploadImageCallBack item', link);

                // this.setState({
                //   expanded: false,
                // });

                this.updateCurrentUser({
                  image: link,
                });
              }
            } 
          })
          .catch( (error) => {
              console.error('Request failed', error);
              // alert("Ошибка выполнения запроса");
            }
          );
      }
    );
  }


  handleActionTouchTap(a,b,c){ 
    this.setState({
      new_photo: null,
      ShowPhotoMessage: false,
    });
  }

  handleRequestClose(a,b,c){ 
    this.setState({
      ShowPhotoMessage: false,
    });
  }

  async onCheckNotice(notice_id, checked){
 

    let {
      user: {
        user,
      },
    } = this.context;

    let {
      notices,
    } = user || {}

    // console.log('notices', notices, notice_id, checked);    

    let notice = notices && notices.find(n => n.id === notice_id);

    if(notice){
      notice.active = checked;
    }

    await this.updateCurrentUser({
      notices,
    });

    await this.Save();

    this.forceUpdate();


    // if(notices && notices.length){

    //   this.setState((prevState) => {

    //     var notices = prevState.current_user.notices;

    //     var new_notices = [];

    //     notices.map(function(item){
    //       if(item.id === notice_id){ 
    //         item.active = (checked === true ? "1" : "0");
    //       }

    //       if(item.active === "1"){
    //         new_notices.push(item.id);
    //       }
    //     });

    //     return {
    //       notices: notices,
    //       new_notices: new_notices,
    //     };
    //   }, () => { 
    //     this.Save();
    //   });
    // }

    return;
  }


  updateCurrentUser(data, silent){

    const {
      updateCurrentUser,
    } = this.context;

    const {
      user,
    } = this.state;

    updateCurrentUser(user, data, silent);

  }


  render(){

    // return <Articles/>;

    /*
    * Если пользователь не был инициализирован,
    * ничего пока не рендерим
    * */
    // if(!this.state.initialized){
    //   return null;
    // }

    let {
      styleManager,
    } = this.context;

    const {
      user: {
        user: current_user,
      },
    } = this.context;

    let {
      theme: {
        palette,
      }
    } = styleManager;

    let accent = palette.accent['500'];

    // let {
    //   current_user,
    // } = this.state;

    let {
      id: current_user_id,
      notices: user_notices,
      sudo,
    } = current_user || {};


    // let {
    //   data: user,
    // // } = this.props || {};
    // } = this.props.document.document || {};

    const {
      user,
    } = this.state;

    if(!user){
      return null;
    }

    // console.log('user', user, this.props);

    let{
      id: user_id,
      companies,
      services,
      works: works_response,
      username,
      fullname,
      email,
      photo,
      blocked,
      active,
      api_key,
      createdon,
    } = user || {};

    let {
      object: works,
      total: works_total,
    } = works_response || {}

    // console.log('Profile', user);

    // console.log('companies', companies, this.state, this.props);

    // console.log('Profile', user);
    // console.log('current_user', current_user);

    // console.log('user_notices', user_notices);

    var card, addition_info;

    var edit_buttons = [];

    let isCurrentUser = false;

    if(current_user && current_user.id > 0 && current_user.id == user.id){

      isCurrentUser = true;

      if(this.state.inEditMode == true){

        edit_buttons.push(<Button
          key="save"
          accent
          onTouchTap={this.Save.bind(this)}
        >Сохранить</Button>);
        edit_buttons.push(<Button
          key="cancel"
          onTouchTap={this.CancelEditProfile.bind(this)}
        >Отмена</Button>);
      }
      else{
        edit_buttons.push(<Button
          key="edit"
          accent
          onTouchTap={this.editProfile.bind(this)}
        >Редактировать</Button>);
      }

    }

    let noticesList = [];


    if(user){

      var {loadingImage} = this.state;

      var Photo;

      let photoStyle = {
        width: 150,
        height: 150,
        margin: "auto",
      };

      if(isCurrentUser){
        Object.assign(photoStyle, {
          cursor: 'pointer',
        });
      }

      Photo = <Avatar 
        // type="extraBig" 
        // avatar={this.state.new_photo || photo} 
        // username={fullname || username}
        user={user} 
        onClick={isCurrentUser ? (event => this.editProfile(event)) : undefined}
        style={photoStyle}
      />

      if(this.state.inEditMode){

        Photo = <Dropzone
          ref="dropzone"
          onDrop={this.onDrop.bind(this)}
          className='dropZone avatar'
        >
          {Photo}
          <div
            style={{
              textAlign: "center",
            }}
          >
            {loadingImage ? 'Загружается...' : 'Перетащите сюда изображение или кликните для загрузки.'}
          </div>
          </Dropzone>;
      }

      let fullname_field;


      var payment;

      if(isCurrentUser){
      
        // var api_key = this.state.new_api_key || this.state.api_key;

        // payment = <Payment user={this.props.user}/>

        



        // addition_info = <div>
        //   {payment}
        // </div>

        // var notices = [];

        if(user_notices && user_notices.length){
          user_notices.map(item => {

            const {
              id: noticeId,
              type,
              comment,
              active,
            } = item;

            noticesList.push(<ListItem
                key={noticeId}
              >
                <Switch className={classes.Switch}
                  onClick={(event) => this.onCheckNotice(noticeId, !active)}
                  checked={active}
                />

                <ListItemText primary={comment}/>
              </ListItem>);
          }, this);
        } 
      }


      if(this.state.inEditMode){
        fullname_field = <Field
          // value={this.state.new_fullname || this.state.fullname}
          value={fullname || ""}
          name="fullname"
          onChange={this.onFieldChange.bind(this)}
          readOnly={!this.state.inEditMode}
          placeholder="Укажите ФИО"
        />
      }
      else{
        fullname_field = fullname;
      }

      card = <Grid
        container
        gutter={0}
      >


        <Grid
          item
          sx={12}
        >

          <Grid
            container
            gutter={0}
          >

            <Grid 
              item
              style={{
                width: 180,
                marginLeft: 32,
                marginBottom: 10,
              }}
            >

              {Photo}

            </Grid>



          </Grid>

        </Grid>






        
        <Grid
          item
          sx={12}
        >

          <Grid
            container
            gutter={0}
          >

            

            <Grid
              item
              xs
            >

              <Grid
                container
                align="flex-start"
              >
                
                <Grid 
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                >
                  <Typography 
                    type="title"
                    style={{
                      marginLeft: 31,
                    }}
                  >
                    {fullname_field}
                  </Typography>

                  <ListItem
                    
                  >
                    {edit_buttons}
                  </ListItem> 
     

                </Grid>



                {createdon
                  ?
                  <Grid 
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                  > 
                    <Typography 
                      type="subheading"
                      style={{
                        marginLeft: 17,
                      }}
                    >
                      Зарегистрирован
                    </Typography>

                    <ListItem
                    >
                      <ListItemIcon>
                        <CalendarIcon />
                      </ListItemIcon>
                      {moment(createdon * 1000).format("DD MMMM YYYY")}
                    </ListItem> 

                    {email
                      ?
                      <div>
                        <Typography 
                          type="subheading"
                          style={{
                            marginLeft: 17,
                            marginTop: 25,
                          }}
                        >
                          Емейл
                        </Typography>

                        <ListItem
                          button
                          onTouchTap={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            this.onHandleEmail(this.state.email);
                          }}
                        >
                          <ListItemIcon
                          >
                            <CommunicationEmail />
                          </ListItemIcon>
                          {email}
                        </ListItem> 
                      </div>
                      :
                      null
                    }


                     



                  </Grid>
                  :
                  null
                }
 
                

                <Grid 
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                >
                  
                </Grid>

                <Grid 
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                >
                  
                </Grid>
                

              </Grid>
            </Grid>
            
          </Grid>
          
        </Grid>
        
        {isCurrentUser
          ?
            <Grid
              item
              xs={12}
            >

              <Grid
                container
              >

                <Grid 
                  item 
                  xs={12}
                  md={6}
                >
                  <Typography 
                    type="title" 
                    style={{
                      marginLeft: 30,
                    }}
                  >
                    Настройки уведомлений
                  </Typography>

                  <List>
                    {noticesList}
                  </List>

                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  {addition_info}
                </Grid>
                
              </Grid>
              
            </Grid>
          :
          null
        }

      </Grid>

    }
    else{
      card = <h3>Пользователь не найден</h3>;
    }

    return (
      <Grid
        container
        gutter={0}
        style={{
          marginTop: 30,
        }}
      >


        <Grid
          item
          xs={12}
        >
        
          {card}

        </Grid> 

        <Grid
          item
          xs={12}
        >
        
          <Grid
            container
          >
          
            

          </Grid> 

        </Grid> 

        {/*works && works.length
          ?
            <Grid
              item
              xs={12}
            >

              <Typography 
                type="title"
                style={{
                  // marginLeft: 17,
                  marginBottom: 5,
                }}
              >
                Портфолио
              </Typography>
              
              <WorksList
                works={works}
                page={0}
                limit={0}
                total={works.length}
              />

 

              {works_total > 4 
                ?
                  <Link
                    to={`katalog-sajtov/?owner=${user.id}`}
                    href={`katalog-sajtov/?owner=${user.id}`}
                    className="underline-none"
                  >
                    <Button>
                      Смотреть все работы пользователя
                    </Button>
                  </Link>
                :
                null
              }

            </Grid>
          :
          null
        */}


        {/*
          <Snackbar
            open={this.state.ShowPhotoMessage || false}
            message={this.state.PhotoMessageText || ""}
            action="Отмена"
            autoHideDuration={3000}
            onActionTouchTap={this.handleActionTouchTap.bind(this)}
            onRequestClose={this.handleRequestClose.bind(this)}
          />

          <Snackbar
            open={this.state.ShowStatusMessage || false}
            message={this.state.StatusMessage || ""}
            autoHideDuration={this.state.StatusMessageDuration || 5000}
          />
        */}
      </Grid>
    );

    return null;
  }


}

// function mapStateToProps(state){
//   return {
//     user: state.user && state.user.user,
//   }
// }

// function mapDispatchToProps(dispatch){
//   return {
//     userActions: bindActionCreators(userActions, dispatch)
//   }
// }

// ProfileView.defaultProps = defaultProps;

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
