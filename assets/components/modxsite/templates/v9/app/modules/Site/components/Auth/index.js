import React, {Component} from 'react';
import PropTypes from "prop-types";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userActions from 'modules/Redux/actions/userActions';
import * as documentActions from 'modules/Redux/actions/documentActions';

// import Prototype from 'material-ui-components/src/Auth';
import Prototype from './Prototype';

import Avatar from 'modules/Site/components/fields/User/avatar.js';




class AuthPrototype extends Prototype{



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

          // console.log("findUser", data);

          if(data.object && data.object.id){
            Object.assign(newStata, {
              step: 2,
              login: data.object.username,
              avatar: data.object.image,
              fullname: data.object.fullname || data.object.username,
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

}

const defaultProps = {
  open: false,
  step: 1,
  showRegForm: true,
  allowPasswordRecovery: true
}

class Auth extends Component{



  render(){

    let {
      userActions,
      documentActions,
      ...other,
    } = this.props;

    // console.log('Auth props', this.props);
    // console.log('Auth props', {...other});

    return <AuthPrototype
      loginCanceled={userActions.loginCanceled}
      GetOwnData={userActions.GetOwnData}
      loginComplete={userActions.loginComplete}
      addInformerMessage={documentActions.addInformerMessage}
      {...other}
    />
  }
}

Auth.defaultProps = defaultProps;

Auth.propTypes = {
  userActions: PropTypes.object.isRequired,
  documentActions: PropTypes.object.isRequired,
}; 

function mapStateToProps(state) {

  return state;
}


function mapDispatchToProps(dispatch) {
  // console.log('mapDispatchToProps');
  // console.log(dispatch);

  return {
    // proxyActions: bindActionCreators(proxyActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    documentActions: bindActionCreators(documentActions, dispatch),
    // documentActions: bindActionCreators(documentActions, dispatch),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth);
