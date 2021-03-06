import React, { Component, PropTypes } from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
// import Avatar from '../Avatar';
import Avatar from 'material-ui-components/src/Avatar';

import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

let loginSubheaderStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: 12,
  minHeight: 18,
}

let DialogStyles = {
  width: '100%',
  maxWidth: 400,
};

let lexicon = {
  loginName: 'Логин',
  passwordName: 'Пароль',
  emailName: 'E-Mail',
  cancel: 'Отмена',
  next: 'Далее',
  prev: 'Назад',
  signin: 'Вход',
  signup: 'Регистрация',
  forgotPassword: 'Забыли пароль?',
  requireLogin: 'Введите ваш логин',
  requireEmail: 'Введите ваш e-mail',
  invalidPassword: 'Неправильный пароль',
  invalidEmail: 'Неправильный формат e-mail',
  errorLogin: 'Пользователь с указанным логином отсутствует на сайте. Нажмите кнопку "Регистрация", чтобы создать нового пользователя',
  registerTitle: 'Регистрация нового пользователя',
}

const defaultProps = {
  open: false,
  step: 1,
  showRegForm: true,
  allowPasswordRecovery: true,
  connector_url: '/assets/components/modxsite/connectors/connector.php',
}

class ProfileDialogAuthStepFindUser extends Component {

  constructor(props){
    super(props);

    this.state = {
    };
  }

  render(){
    let scope = this.props.scope;
    let evt = this.props.evt;
    let user = scope.state;
    var actions = [];

    if(this.props.showRegForm === true){

      actions.push(
        <Button
          key="signup"
          onTouchTap={scope.setStep.bind(scope, 3)} >
          {lexicon.signup}
        </Button>
      );
    }

    actions.push(<Button
      key="cancel"
      onTouchTap={scope.modalClose.bind(scope)}>
      {lexicon.cancel}
    </Button>);

    actions.push(<Button
      key="next"
      onTouchTap={scope.findUser.bind(scope)}
      accent
    >
      {lexicon.next}
    </Button>);

    var error = (this.props.errors && this.props.errors.login && this.props.errors.login.errorText ? this.props.errors.login.errorText : '');

    return (
      <Dialog
        maxWidth="xs"
        open={true}
        onRequestClose={this.onRequestClose}
        onEntering={this.handleEntering}
      >

        <DialogContent>

          <Avatar
            type="big"
            username={user.username}
            avatar={user.avatar}
          />

          <div style={loginSubheaderStyle} />

          <TextField
            label={lexicon.loginName + (error != '' ? ' (' + error + ')' : '')}
            key="login"
            name="login"
            error={error != ''}
            onFocus={evt.clearError.bind(scope)}
            onKeyDown={(e) => {
              if(e.which == 13){
                scope.findUser();
              }
            }}
            onChange={this.props.onChange}
            value={this.props.login}
          />

        </DialogContent>

        <DialogActions>
          {actions}
        </DialogActions>

      </Dialog>
    );
  }
}

class ProfileDialogAuthStepAuth extends Component {


  render(){
    let scope = this.props.scope;
    let evt = this.props.evt;
    let user = scope.state;
    let username = user.fullname ? user.fullname : user.login;

    var actions = [];

    // actions.push();


    // if(
    //   this.props.errors
    //   && this.props.errors.login_error
    //   && this.props.errors.login_error != ""
    // ){

    // }

    var content;

    if(scope.state.show_forgot_text === true){
      content = <div style={{
        margin: "20px 0 0",
        textAlign: "center",
      }}>
        Пароль выслан Вам на почту
      </div>;

      actions.push(<Button
        key="restore"
        accent
        onTouchTap={() => {
          scope.setState({
            show_forgot_text: false,
          });
        }}
      >
        Назад
      </Button>);

    }
    else{

      if(this.props.allowPasswordRecovery === true){
        actions.push(<Button
          key="forgot"
          disabled={this.props.password_send_in_progress == true ? true : false}
          onTouchTap={scope.sendNewPassword.bind(scope)}
        >
          Новый пароль
        </Button>);
      }

      actions.push(<Button
        key="prev"
        primary={false}
        onTouchTap={scope.setStep.bind(scope, 1)}
      >{lexicon.prev}</Button>);

      actions.push(<Button
        key="signin"
        accent
        onTouchTap={scope.loginSubmit.bind(scope)}
      >
        {lexicon.signin}
      </Button>);

      if(this.props.is_forgot){
        actions.unshift(
          <Button
            key="forgot"
            primary={true}
          >
            {lexicon.forgotPassword}
          </Button>
        );
      }

      var error = this.props.errors && this.props.errors.login_error ? this.props.errors.login_error : '';

      content = <TextField
        label={lexicon.passwordName + (error != "" ? ' ('+ error +')' : "")}
        key="password"
        type="password"
        name="password"
        error={error != ""}
        value={this.props.password}
        onChange={this.props.onChange}
        onFocus={evt.clearError.bind(scope)}
        onKeyDown={(e) => {
          if(e.which == 13){
            scope.loginSubmit(scope);
          }
        }}
      />;
    }

    return (
      <Dialog
        maxWidth="xs"
        open={true}
        onRequestClose={this.onRequestClose}
      >

        <DialogContent>

          <Avatar
            type="big"
            username={user.username}
            avatar={user.avatar}
          />

          <div style={loginSubheaderStyle}>{username}</div>

          {content}

        </DialogContent>

        <DialogActions>
          {actions}
        </DialogActions>

      </Dialog>
    );
  }
}

class ProfileDialogAuthStepRegister extends Component {

  state = {}

  onEnter(){
    this.props.registerSubmit();
  }


  setDelegate = (isDelegate) => {

    let scope = this.props.scope;

    if(this.props.errors && this.props.errors.delegate){
      this.props.errors.delegate = undefined;
    }

    scope.setState({
      delegate: isDelegate,
    });

  }

  render(){
    let scope = this.props.scope;
    let evt = this.props.evt;

    const {
      delegate,
    } = scope.state;

    var actions = [
      <Button
        key="cancel"
        onTouchTap={scope.modalClose.bind(scope)}
      >
        {lexicon.cancel}
      </Button>,

      <Button
        key="next"
        onTouchTap={scope.setStep.bind(scope, 1)}
      >
        {lexicon.signin}
      </Button>,

      <Button
        key="submit"
        accent
        onTouchTap={this.props.registerSubmit}
      >
        {lexicon.signup}
      </Button>
    ];

    return (
      <Dialog
        maxWidth="xs"
        open={true}
        onRequestClose={this.onRequestClose}
      >
        <DialogContent>

          <div style={loginSubheaderStyle}>{lexicon.registerTitle}</div>

          <TextField
            key="login"
            label={lexicon.loginName}
            error={this.props.errors && this.props.errors.username ? true : false}
            helperText={this.props.errors && this.props.errors.username || ""}
            name="login"
            value={this.props.login}
            onChange={this.props.onChange}
            onFocus={e => {
              if(this.props.errors && this.props.errors.username){
                this.props.errors.username = "";
                this.forceUpdate();
              }
              if(this.props.errors && this.props.errors.login){
                this.props.errors.login = "";
                this.forceUpdate();
              }
            }}
            onKeyDown={(e) => {
              if(e.which == 13){
                this.onEnter();
              }
            }}
          />


          <TextField
            key="email"
            label={lexicon.emailName}
            error={this.props.errors && this.props.errors.email ? true : false}
            helperText={this.props.errors && this.props.errors.email || ""}
            type="email"
            name="email"
            value={this.props.email}
            onChange={this.props.onChange}
            onFocus={e => {
              if(this.props.errors && this.props.errors.email){
                this.props.errors.email = "";
                this.forceUpdate();
              }
            }}
            onKeyDown={(e) => {
              if(e.which == 13){
                this.onEnter();
              }
            }}
          />

          <div
            style={{
              marginTop: 25,
            }}
          >
            


            <div
              style={{
                position: "relative",
              }}
            >
            
              <InputLabel
                style={{
                  color: this.props.errors && this.props.errors.delegate ? "#ff1744" : undefined,
                }}
              >
                Вы являетесь представителем бани или сауны?
              </InputLabel>

            </div>

            <div
              style={{
                textAlign: "center",
                position: "relative",
              }}
            >
                
              <Button
                onClick={e => {
                  this.setDelegate("1");
                }}
                accent={delegate === "1"}
              >Да</Button>
                
              <Button
                onClick={e => {
                  this.setDelegate("0");
                }}
                accent={delegate === "0"}
              >Нет</Button>

            </div>

            {/*<FormHelperText>
              Пожалуйста, сделайте выбор
            </FormHelperText>*/}

          </div>



        </DialogContent>


        <DialogActions>
          {actions}
        </DialogActions>

      </Dialog>
    );
  }
}

export default class Auth extends Component {


  constructor(props){
    
    super(props);

    this.state = {
      wait_for_response: false,
      errors: {},
      actions: [],
      is_forgot: true,
      show_forgot_text: false,
      step: props.step,
      login: '',
      avatar: '',
      email: '',
      password: '',
    }
  }

  modalClose(){
    this.setState({
      step: 1,
    });
    this.props.loginCanceled();
  }

  findUser(){

    if(this.state.wait_for_response === true){
      return;
    }

    var query = this.state.login;

    var body = new FormData();

    var data = {
      query: query,
    };

    for(var i in data){
      body.append(i, data[i]);
    };

    // var headers;

    var newStata = {
      errors: {
        login: "",
      },
      wait_for_response: false,
    }

    fetch(this.props.connector_url +'?pub_action=users/find_user',{
      credentials: 'same-origin',
      method: "POST",
      body: body,
    })
      .then(function (response) {

        return response.json()
      })
      .then(function (data) {
 
        if(data.success){

          if(data.object && data.object.id){
            Object.assign(newStata, {
              step: 2,
              login: data.object.username,
              avatar: data.object.photo,
              fullname: data.object.fullname,
            });
          }
          else{

            newStata.errors = {
              login: {
                errorText: "Ошибка",
              }
            }

            this.props.addInformerMessage({
              text: data.message || "Пользователь не был найден",
              autohide: 3000,
            });
          }
        }
        else{

          this.props.addInformerMessage({
            text: data.message || "Ошибка выполнения запроса",
            autohide: 4000,
          });
        } 

        this.setState(newStata);

      }.bind(this))
      .catch((error) => {
          console.error('Request failed', error);
          this.setState(newStata);

          this.props.addInformerMessage({
            text: "Ошибка выполнения запроса",
            autohide: 4000,
          });
        }
      );

    this.setState({
      wait_for_response: true,
    });
  }

  loginSubmit(){

    if(this.state.wait_for_response === true){
      return;
    }

    var body = new FormData();

    var data = {
      login: this.state.login,
      password: this.state.password,
    };

    for(var i in data){
      body.append(i, data[i]);
    };

    // var headers;

    var errors = {}

    var newState = {
      errors,
      wait_for_response: false,
    };

    fetch(this.props.connector_url +'?pub_action=login',{
      credentials: 'same-origin',
      method: "POST",
      body: body,
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
 
        if(data.success){
          this.props.GetOwnData();
          this.props.loginComplete();
 
          newState.email = "";
          newState.password = "";
        }
        else{

          errors.login_error = "Ошибка";

          this.props.addInformerMessage({
            text: data.message || "Ошибка выполнения запроса",
            autohide: 3000,
          });
        }

        this.setState(newState);

      }.bind(this))
      .catch((error) => {


          this.props.addInformerMessage({
            text: "Ошибка выполнения запроса",
            autohide: 4000,
          });
        this.setState(newState);
      });

    this.setState({
      wait_for_response: true,
    });
    // }
  }

  registerSubmit(){

    if(this.state.wait_for_response === true){
      return;
    } 

    var body = new FormData();

    var data = {
      username: this.state.login,
      email: this.state.email,
      delegate: this.state.delegate,
    };

    for(var i in data){
      body.append(i, data[i]);
    };


    var errors = {}

    var newState = {
      errors,
      wait_for_response: false,
    };

    fetch(this.props.connector_url +'?pub_action=registration',{
      credentials: 'same-origin',
      method: "POST",
      body: body,
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {

        if(data.success === true){
          this.props.GetOwnData();
          this.props.loginComplete();

          Object.assign(newState, {
            step: 1,
            login: "",
            email: "",
            password: "",
          });
        }
        else{

          if(data.data && data.data.length){

            data.data.map(function(error){
              if(error.msg != ''){
                errors[error.id] = error.msg;
              }
            }, this);
          }


          this.props.addInformerMessage({
            text: data.message || "Ошибка выполнения запроса",
            autohide: 3000,
          });
        } 

        this.setState(newState);

      }.bind(this))
      .catch((error) => {
        console.error('Request failed', error);

        this.props.addInformerMessage({
          text: "Ошибка выполнения запроса",
          autohide: 4000,
        });
      });


    this.setState({
      wait_for_response: true,
    });
  }

  sendNewPassword(){

    var body = new FormData();

    var data = {
      username: this.state.login,
    };

    for(var i in data){
      body.append(i, data[i]);
    };

    // var headers;

    this.setState({
      password_send_in_progress: true,
    });

    fetch(this.props.connector_url +'?pub_action=password/forgot',{
      credentials: 'same-origin',
      method: "POST",
      body: body,
    })
      .then(function (response) {

        return response.json()
      })
      .then(function (data) {

        var newState = {
          password_send_in_progress: false,
          errors: this.state.errors,
        };

        if(data.success == true){
          Object.assign(newState, {
            is_forgot: false,
            show_forgot_text: true,
          });

          Object.assign(newState.errors, {
            login_error: ""
          });
        }
        else{

          this.props.addInformerMessage({
            text: data.message || "Ошибка выполнения запроса",
            autohide: 3000,
          });
        }

        this.setState(newState);


      }.bind(this))
      .catch(function (error) {

        }
      );
  }

  setStep(step){
    this.state.step = step;
    this.setState({
      errors: {},
      step: step,
    });
  }

  clearError(){
    this.setState({
      errors: {},
    });
  }


  onChange(e){
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  componentWillReceiveProps(nextProps){

    let newState = {}

    if(
      nextProps.step != this.props.step
      && nextProps.step != this.state.step
    ){
      Object.assign(newState, { 
        errors: {},
        step: nextProps.step,
      });
    }

    this.setState(newState);

    return true;
  }

  render(){ 

    if(this.props.open !== true){
      return null;
    }

    let dialogContent = null;

    switch(this.state.step){
      case 1:
        dialogContent = (
          <ProfileDialogAuthStepFindUser
            key="find_user"
            errors={this.state.errors}
            scope={this}
            onChange={(e) => {
              this.onChange(e)
            }}
            evt={{
              clearError: this.clearError,
              loginCanceled: this.props.loginCanceled,
            }}
            {...this.props}
          />
        );
        break;

      case 2:
        dialogContent = (
          <ProfileDialogAuthStepAuth
            key="auth"
            errors={this.state.errors}
            scope={this}
            password={this.state.password}
            allowPasswordRecovery={this.props.allowPasswordRecovery}
            onChange={(e) => {
              this.onChange(e)
            }}
            evt={{
              clearError: this.clearError,
              loginCanceled: this.props.loginCanceled,
            }} />
        );
        break;

      case 3:

        if(this.props.showRegForm){
          dialogContent = (
            <ProfileDialogAuthStepRegister
              key="register"
              scope={this}
              errors={this.state.errors}
              onChange={(e) => {
                this.onChange(e)
              }}
              registerSubmit={() => {
                this.registerSubmit();
              }}
              evt={{
                clearError: this.clearError,
                loginCanceled: this.props.loginCanceled,
              }} />
          );
        }

        break;

      default:
        return null;
    }

    return dialogContent;
  }
}

Auth.defaultProps = defaultProps;

Auth.propTypes = {
  loginCanceled: PropTypes.func.isRequired,
  GetOwnData: PropTypes.func.isRequired,
  loginComplete: PropTypes.func.isRequired,
  addInformerMessage: PropTypes.func.isRequired,
  connector_url: PropTypes.string.isRequired,
}; 