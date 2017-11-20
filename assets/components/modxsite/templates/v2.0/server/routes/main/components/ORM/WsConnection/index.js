

import { List } from 'immutable';



export const getList = async (object, args, context, info) => {

  const {
    user,
    limit,
    page,
  } = args;

  const {
  	ws_clients: clients,
  } = context;

  let result;

  // console.log('wsClients getList args', args);

  if(clients){

  	let state = List(clients);


    // status: {
    //   type: GraphQLString,
    //   description: 'Находится онлайн',
    //   resolve: (object, args) => {

    //     console.log("WsConnectionType object", object);

    //     return object.readyState == 1 ? 'Он-лайн' : null;
    //   },
    // },
    // query: {
    //   type: new GraphQLObjectType({
    //     name: 'WebsocketUpgradeReq',
    //     fields: {
    //       uid: {
    //         type: GraphQLInt,
    //       },
    //     },
    //   }),
    //   resolve: (object, args) => {
    //     // IncomingMessage
    //     // console.log('User resolver query', object && object.query, object.upgradeReq);
    //     // console.log('User resolver', object && object.upgradeReq, object);

    //     return object.upgradeReq && object.upgradeReq.query || null;
    //   },
    // },

    state.map(client => {

      const status = client.readyState == 1 ? 'Он-лайн' : null;
      const query = client.upgradeReq && client.upgradeReq.query || null;

      Object.assign(client, {
        status,
        query,
      });

    });

    // Фильтр по пользователю
    if(user){

      state = state.filter(c => {

        const {
          query,
        } = c.upgradeReq || {};


        const {
          uid,
        } = query || {};

        return uid && parseInt(uid) === user || false;

      });

    }


    result = {
      total: state && state.size || 0,
      count: state && state.size || 0,
      object: state,
      limit,
      page,
    };
  	
  }

  // console.log('wsClients state', state);


  return result;

};

