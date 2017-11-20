import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';


import {
  UserType,
	// modxUserType,
} from '../User';

import {
  coordsType,
} from '../fields';

import WsMessageType from '../WsMessage';

const WsConnectionType = new GraphQLObjectType({
  name: 'WsConnectionType',
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        // resolve: source=> {
        //   console.log("WsConnectionType ID", source.id);
        // }
      },
      status: {
        type: GraphQLString,
        description: 'Находится онлайн',
        // resolve: (object, args) => {

        //   console.log("WsConnectionType object", object);

        //   return object.readyState == 1 ? 'Он-лайн' : null;
        // },
      },
      query: {
        type: new GraphQLObjectType({
          name: 'WebsocketUpgradeReq',
          fields: {
            uid: {
              type: GraphQLInt,
            },
          },
        }),
        // resolve: (object, args) => {
        //   // IncomingMessage
        //   // console.log('User resolver query', object && object.query, object.upgradeReq);
        //   // console.log('User resolver', object && object.upgradeReq, object);

        //   return object.upgradeReq && object.upgradeReq.query || null;
        // },
      },
      user: {
        type: UserType,
        resolve: (object, args, context, info) => {

          const {
            query,
          } = object.upgradeReq || {};

          const {
            uid,
          } = query || {};

          if(!uid){

            return null;
          }

          Object.assign(args, {
            id: uid,
          });

          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);


          // return new Promise(async (resolve, reject) => {

          //   const {
          //     query,
          //   } = object.upgradeReq || {};

          //   const {
          //     uid,
          //   } = query || {};

          //   if(!uid){

          //     return resolve(null);
          //   }

          //   // else 

          //   // this.userResolver(object, {
          //   //   id: uid,
          //   // })
          //   //   .then(result => resolve(result))
          //   //   .catch(e => reject(e));

          //   let result;

          //   const {
          //     localQuery,
          //   } = context;

          //   Object.assign(args, {
          //     userId: parseInt(uid),
          //   });

          //   await localQuery({
          //     operationName: "UserById",
          //     variables: args,
          //   })
          //     .then(r => {

          //       const {
          //         user,
          //       } = r.data;

          //       result = user;

          //     });

          //   resolve(result);

          // });
          
        },
      },
      coords: {
        type: coordsType,
        description: coordsType.description,
      },
      sendWsUserMessageTypeNotice: {
        type: WsMessageType,
        args: {
          type: {
            type: new GraphQLNonNull(GraphQLString),
          },
          message_id: {
            type: GraphQLInt,
          },
          text: {
            type: GraphQLString,
          },
        },
        resolve: (source, args, context, info) => {

        	const {
        		SendWebSocketMessage,
        	} = context;

          const {
            text,
            type,
            message_id,
          } = args;


          let {
            variableValues
          } = info;

          // console.log("SendWebSocketMessage source", source);
          // console.log("SendWebSocketMessage args", args);
          // console.log("SendWebSocketMessage variableValues", variableValues);

          // return;

          return new Promise((resolve, reject) => {
            SendWebSocketMessage(source, {
              text,
              type,
              message_id,
            });

            resolve({
              type,
              text,
              message_id,
            });
          });
        },
      },
    }
  },
});

export default WsConnectionType;
