

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



  if(clients){

  	let state = List(clients);


    // status: {
    //   type: GraphQLString,
    //   description: 'Находится онлайн',
    //   resolve: (object, args) => {



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




  return result;

};

