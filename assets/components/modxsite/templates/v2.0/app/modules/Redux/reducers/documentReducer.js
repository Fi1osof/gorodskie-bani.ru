import * as env from '../actions/documentActions';

const initialState = {
  document: null,
  document_view: 'Index',
  informerMessage: '',
  stores: {},
  apiData: {},
  // mapData: {},
  // citiesData: null,
  // outputState: null,
  inputState: null,
  resourceState: null,  // Состояние запрошенной страницы
};

/*
 * */

export default function (state = initialState, action) {

  var st = Object.assign({},state);

  switch (action.type) {

    case env.INFORMER_MESSAGE_ADDED:

      // console.log("INFORMER_MESSAGE_ADDED", st);

      let {
        notifications_store,
      } = st.stores || {};

      if(notifications_store){

        // console.log("INFORMER_MESSAGE_ADDED 2", notifications_store);

        var dispatcher = notifications_store.getDispatcher();

        var {message} = action;

        if(typeof message != "object"){
          message = {
            text: message,
            autohide: 4000,
          };
        }


        var {autohide} = message;

        // console.log("CREATED", message);

        if(!message.handleClose){
          message.handleClose = () => {
            dispatcher.dispatch(notifications_store.actions['REMOVE'], message);
          }
        }

        if(autohide && autohide > 0){
          setTimeout(message.handleClose, autohide);
        }

        dispatcher.dispatch(notifications_store.actions['CREATE'], message);


        // console.log("INFORMER_MESSAGE_ADDED 3", notifications_store.getState());
      }

      break;

    case env.INFORMER_MESSAGE_REMOVED:

      // var dispatcher = notifications_store.getDispatcher();

      // dispatcher.dispatch(notifications_store.actions['REMOVE'], action.message);

      break;

    default:
      ;
  }
  return st
}
