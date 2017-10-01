import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

import ObjectType, {order} from '../';
import ModelObject from '../model';



export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  return new Promise((resolve, reject) => {
    let {
      id,
      limit,
      page,
      offset: start,
      count,
      search,
    } = args || {};

    limit = limit || 0;

    let action = 'users/getdata';

    let params = {
      id,
      limit,
      page,
      start,
      count: count === undefined ? 0 : count,
      search,
    };

    let request = SendMODXRequest(action, params);

    request
    .then((data) => {

      if(!data.success){

        return reject(data.message || "Ошибка выполнения запроса");
      }

      return resolve(data);
    })
    .catch((e) => {
      return reject(e);
    })
    ;
  });
}

