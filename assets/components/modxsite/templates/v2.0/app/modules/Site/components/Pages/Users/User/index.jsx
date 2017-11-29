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

import CrmUserData from './CrmUserData';

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


import moment from 'moment';
// moment.locale('ru');


import Page from '../../layout'; 

// import View from './View';


let {
  ...defaultProps
} = Page.defaultProps;

defaultProps = Object.assign(defaultProps, {
  inEditMode: false,
  isDirty: false,
  allowEdit: true,
});


let {
  ...contextTypes
} = Page.contextTypes;


contextTypes = Object.assign(contextTypes, {
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
});


export default class UserPage extends Page {

  static contextTypes = contextTypes;

  // static propTypes = propTypes;

  static defaultProps = defaultProps;

  // state = {}

  constructor(props){
    super(props);

    const {
      inEditMode,
    } = props;

    this.state = {
      inEditMode,
    };

    return;
  }

  componentWillMount(){

    /*
    * Если нет данных пользователя, но известен ID,
    * запрашиваем данные с сервера
    * */

    classes = this.context.styleManager.render(styleSheet);

    super.componentWillMount && super.componentWillMount();
  }



  componentDidMount(){

    this.processAction();

    super.componentDidMount && super.componentDidMount();
  }



  // componentDidUpdate(prevProps, prevState, prevContext){

  //   const {
  //     username,
  //   } = this.props;

  //   const {
  //     username: prevUsername,
  //   } = prevProps;

  //   console.log("componentDidUpdate", username, prevUsername);

  //   if((username || prevUsername) && username !== prevUsername){
  //     this.reloadData();
  //   }

  //   super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState, prevContext);
  // }



  loadData(){


    const {
      params,
    } = this.props;

    let {
      username,
    } = params || {};

    return super.loadData({
      username: decodeURI(username),
    });

  }


  async loadServerData(provider, options = {}){


    const {
      username,
    } = options;



    if(!username){
      return null;
    }

    const result = await provider({
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

      const {
        user,
      } = r.data;


      if(!user){
        return null;
      }


      return r;
    })
    .catch(e => {
      // console.error(e);
      throw(e);
    }); 



    if(result && result.data){

      const {
        user,
      } = result.data;

      let title = [];

      if(user){

        const {
          username,
          fullname,
        } = user;

        fullname && title.push(fullname);

        title.push(username);

        title = title.join(", ");

      }

      Object.assign(result.data, {
        title,
      });

    }
    else{
      return null;
    }

    // console.log("User page result", result);

    return result;
    
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

    newUserState[field] = value;


    this.updateCurrentUser(newUserState);
  }


  async Save(clearCache = false){

    const {
      saveCurrentUser,
    } = this.context;

    const {
      user,
    } = this.state;

    let result = await saveCurrentUser(user)
    .then(r => {

      return r;

    })
    .catch(e => {
      console.error(r);
    });

    console.log("clearCache", clearCache);

    if(clearCache === true){

      await this.clearCache();

    }

    // this.forceUpdate();
    await this.reloadData();

    this.setState({
      inEditMode: false,
    });

    return result;
  }


  clearCache(){

    const {
      remoteQuery,
    } = this.context;

    return remoteQuery({
      operationName: "clearCache",
    });
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
 



                // this.setState({
                //   expanded: false,
                // });

                const newUser = this.updateCurrentUser({
                  image: link,
                  imageFormats: {
                    thumb: `/images/resized/thumb${link}`,
                  },
                });

                console.log("newUser", newUser);

              }
            }
            else{
              reject("Ошибка загрузки фото");
            }
          })
          .catch( (error) => {
            console.error('Request failed', error);
            // alert("Ошибка выполнения запроса");
            reject("Ошибка выполнения запроса");
          });
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

    

    let notice = notices && notices.find(n => n.id === notice_id);

    if(notice){
      notice.active = checked;
    }

    const newUser = await this.updateCurrentUser({
      notices,
    });

    // console.log("newUser", newUser);

    let result = await this.Save();


    return;
  }


  updateCurrentUser(data, silent){

    const {
      updateCurrentUser,
    } = this.context;

    let {
      user,
    } = this.state;

    const newUser = updateCurrentUser(user, data, silent);

    Object.assign(user, newUser);

    this.setState({
      user,
    });

    return newUser;

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
        hasPermission,
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

    const hasCRMPerm = current_user && hasPermission("CRM");

    // let {
    //   data: user,
    // // } = this.props || {};
    // } = this.props.document.document || {};

    let {
      user,
    } = this.state;

    if(!user){
      return null;
    }

    /*
      Если текущий пользователь совпадает с карточкой, то мержим объекты чтобы получить полные данные профиля
    */
    if(current_user && current_user.id === user.id){
      Object.assign(user, current_user);
    }


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










    var card, addition_info;

    var edit_buttons = [];

    let isCurrentUser = false;

    if(current_user && current_user.id > 0 && current_user.id == user.id){

      isCurrentUser = true;

      if(this.state.inEditMode == true){

        edit_buttons.push(<Button
          key="save"
          accent
          onTouchTap={event => this.Save(true)}
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
          xs={12}
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
          xs={12}
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
                  sm
                  // sm={6}
                  // lg={3}
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



                <Grid 
                  item
                  xs={12}
                  sm
                  // sm={6}
                  // lg={3}
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
                  style={{
                    whiteSpace: "nowrap",
                  }}
                  >
                    <ListItemIcon
                    > 
                      <CalendarIcon 
                      /> 

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
                          this.onHandleEmail(email);
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

        {hasCRMPerm
          ?
          <Grid
            item
            xs={12}
          >
            <CrmUserData
              user={user}
            />
          </Grid> 
          :
          null
        }

      </Grid>

    }
    else{
      card = <h3>Пользователь не найден</h3>;
    }

    const {
      username: locationUserName,
    } = this.props.params || {};

    return super.render(
      <Grid
        container
        gutter={0}
        style={{
          marginTop: 30,
        }}
      >

        {/*<View 
          key={locationUserName}
          loadData={::this.reloadData}
        />*/}

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

      </Grid>
    );

    return null;
  }

}
