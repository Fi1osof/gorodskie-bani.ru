
var debug = require('debug')("server:response");

import moment from 'moment';


import {db as db_config} from '../../../../config/config'; 

let {
  connection: {
    prefix,
  },
} = db_config;

import {
  buildSchema,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

var knex;
  
 

export default class Response{

  constructor(req, res, params, knexdb){
 

    knex = knexdb;

		this.req = req;
    this.res = res;
		this.params = params;
 
	}

  usersResolver = (project) => {

    var q = knex(`${prefix}users as users`)
      .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      .select('profile.*')
      .select('users.*') 
      .limit('3')
      ; 
      // console.log('.toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  resourcesResolver = (author) => {  

    let {
      id: author_id,
    } = author || {};

    var q = knex(`${prefix}site_content as resources`)
      .select('resources.*')
      .limit('3')
      ; 
      
      q.where("deleted", 0);
      q.where("published", 1);
      q.where("hidemenu", 0);
      q.where("context_key", "web");

      if(author_id){
        q.where("createdby", author_id);
      }
      

      // console.log('.toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  process(){  

    let {
      pub_action,
      ...params 
    } = this.getRequestParams();

    // console.log('Query params', params); 

    try{
      switch(pub_action){

        case 'graphql':

          let {
            query,
          } = params;

          query = JSON.parse(query);

          // console.log('graphql params', query);

          const DocumentType = new GraphQLObjectType({
            name: 'DocumentType',
            fields: {
              id: {
                type: GraphQLInt
              },
              pagetitle: {
                type: GraphQLString
              },
              longtitle: {
                type: GraphQLString
              },
              uri: {
                type: GraphQLString
              },
            }
          });

          const UserType = new GraphQLObjectType({
            name: 'UserType',
            fields: {
              id: {
                type: GraphQLInt
              },
              username: {
                type: GraphQLString
              },
              fullname: {
                type: GraphQLString
              },
              resources: {
                type: new GraphQLList(DocumentType),
                resolve: (author) => {
                  return this.resourcesResolver(author);
                },
              }
            }
          });


          const RootType = new GraphQLObjectType({
            name: 'RootType',
            fields: {
              users: {
                type: new GraphQLList(UserType),
                resolve: () => {
                  return this.usersResolver();
                },
              },
              resources: {
                type: new GraphQLList(DocumentType),
                resolve: () => {
                  return this.resourcesResolver();
                },
              },
              resource: {
                type: DocumentType,
                args: {
                  id: {
                    type: new GraphQLNonNull(GraphQLID)
                  }
                },
                resolve(parent, {id}) {


                  return {id: id, name: `Project ${id}`}
                }
              }
            }
          });



          var schema = new GraphQLSchema({
            query: RootType
          });


          graphql(schema, query).then((response) => {

            this.success("", response);
          });

          return ;
          break;
   
      }
    }
    catch(e){

      return this.failure(e.message, e.stack);
    }

    return this.failure("Неизвестное действие");
  }

  getRequestParams(){
    let params = this.params || {};
    let query = this.req.query || {};

    return Object.assign(query, params);
  }

  success(message, object){

  	return this.outputResponse(true, message, object)
  }

  failure(message, object){

  	return this.outputResponse(false, message, object)
  }

  outputResponse(success, message, object){

  	let output = object || {};

    this.res.writeHead(200, {'Content-Type': 'application/json'});
    this.res.end(JSON.stringify(output));
  } 

}