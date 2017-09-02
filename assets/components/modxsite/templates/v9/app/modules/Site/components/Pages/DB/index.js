import React, {Component} from 'react';

import PropTypes from 'prop-types';

import GraphiQL from 'graphiql';

// import { graphql, buildSchema } from 'graphql';

// console.log('GraphiQL', GraphiQL, graphql, buildSchema);
// console.log('resolve', resolve);

import {
	buildSchema,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,

  introspectionQuery, 
  buildClientSchema, 
  printSchema,
} from 'graphql';

import 'graphiql/graphiql.css';


import Page from '../layout'; 

import {Link} from 'react-router';

export default class DbPage extends Page{

  static contextTypes = {
    apiRequest: PropTypes.func.isRequired,
  }; 

	constructor(props){

		super(props);

		this.state = {}
	}

  componentDidMount(){


    this.loadSchema();
    // this.getSchema();
  }
 

  // getSchema(){

  //   let PlaceType;

  //   let ContactType;

  //   PlaceType = new GraphQLObjectType({
  //     name: 'PlaceType',
  //     fields: () => {

  //       return {
  //         id: {
  //           type: GraphQLInt
  //         },
  //         name: {
  //           type: GraphQLString
  //         },
  //         contacts: {
  //           type: new GraphQLList(ContactType),
  //           resolve: (place) => {

  //             const {
  //               id: place_id,
  //             } = place;

  //             return this.contactsResolver(null, {
  //               place_id,
  //             });
  //           },
  //         },
  //       };
  //     },
  //   }); 

  //   ContactType = new GraphQLObjectType({
  //     name: 'ContactType',
  //     fields: () => {

  //       return {
  //         id: {
  //           type: GraphQLInt
  //         },
  //         name: {
  //           type: GraphQLString
  //         },
  //         places: {
  //           type: new GraphQLList(PlaceType),
  //           resolve: (contact) => {

  //             const {
  //               id: contact_id,
  //             } = contact;

  //             return this.placesResolver(null, {
  //               contact_id,
  //             });
  //           },
  //         },
  //       }
  //     }
  //   });

  //   const ServiceType = new GraphQLObjectType({
  //     name: 'ServiceType',
  //     fields: {
  //       id: {
  //         type: GraphQLInt
  //       },
  //       name: {
  //         type: GraphQLString
  //       },
  //       parent: {
  //         type: GraphQLInt
  //       },
  //       // places: {
  //       //   type: new GraphQLList(PlaceType),
  //       //   resolve: (contact) => {
  //       //     return this.placesResolver(contact);
  //       //   },
  //       // }
  //       contacts: {
  //         type: new GraphQLList(ContactType),
  //         args: {
  //           id: {
  //             type: GraphQLID
  //             // type: new GraphQLNonNull(GraphQLID)
  //           },
  //           limit: {
  //             type: GraphQLInt
  //           },
  //         },
  //         resolve: (object, args) => {

  //           console.log('this.ServiceType contactsResolver', object, args);

  //           const {
  //             id: service_id,
  //           } = object;

  //           Object.assign(args, {
  //             service_id,
  //           });

  //           console.log('this.ServiceType contactsResolver 2', object, args);


  //           return this.contactsResolver({}, args);
  //         },
  //       },
  //     }
  //   });

  //   const DocumentType = new GraphQLObjectType({
  //     name: 'DocumentType',
  //     fields: {
  //       id: {
  //         type: GraphQLInt
  //       },
  //       pagetitle: {
  //         type: GraphQLString
  //       },
  //       longtitle: {
  //         type: GraphQLString
  //       },
  //       uri: {
  //         type: GraphQLString
  //       },
  //     }
  //   });

  //   const UserType = new GraphQLObjectType({
  //     name: 'UserType',
  //     fields: {
  //       id: {
  //         type: GraphQLInt
  //       },
  //       username: {
  //         type: GraphQLString
  //       },
  //       fullname: {
  //         type: GraphQLString
  //       },
  //       resources: {
  //         type: new GraphQLList(DocumentType),
  //         resolve: (author) => {
  //           return this.resourcesResolver(author);
  //         },
  //       }
  //     }
  //   });


  //   const RootType = new GraphQLObjectType({
  //     name: 'RootType',
  //     fields: {
  //       contacts: {
  //         type: new GraphQLList(ContactType),
  //         args: {
  //           id: {
  //             type: GraphQLID
  //             // type: new GraphQLNonNull(GraphQLID)
  //           },
  //           limit: {
  //             type: new GraphQLNonNull(GraphQLInt)
  //             // type: GraphQLInt
  //           },
  //           service_id: {
  //             type: GraphQLInt
  //           },
  //           place_id: {
  //             type: GraphQLInt
  //           },
  //         },
  //         resolve: (object, args) => {

  //           console.log('this.contactsResolver', object, args);

  //           return this.contactsResolver(object, args);
  //         },
  //       },
  //       places: {
  //         type: new GraphQLList(PlaceType),
  //         args: {
  //           id: {
  //             type: GraphQLID
  //             // type: new GraphQLNonNull(GraphQLID)
  //           },
  //           limit: {
  //             // type: GraphQLInt
  //             type: new GraphQLNonNull(GraphQLInt)
  //           },
  //           contact_id: {
  //             type: GraphQLInt
  //           },
  //           withGeoOnly: {
  //             type: GraphQLBoolean
  //           },
  //         },
  //         resolve: (object, args) => {

  //           // console.log('this.contactsResolver', object, args);

  //           return this.placesResolver(object, args);
  //         },
  //       },
  //       services: {
  //         type: new GraphQLList(ServiceType),
  //         args: {
  //           id: {
  //             type: GraphQLID
  //             // type: new GraphQLNonNull(GraphQLID)
  //           },
  //           limit: {
  //             type: GraphQLInt
  //           },
  //           // contact_id: {
  //           //   type: GraphQLInt
  //           // },
  //           // withGeoOnly: {
  //           //   type: GraphQLBoolean
  //           // },
  //         },
  //         resolve: (object, args) => {
  //           return this.servicesResolver(object, args);
  //         },
  //       },
  //       users: {
  //         type: new GraphQLList(UserType),
  //         resolve: () => {
  //           return this.usersResolver();
  //         },
  //       },
  //       resources: {
  //         type: new GraphQLList(DocumentType),
  //         resolve: () => {
  //           return this.resourcesResolver();
  //         },
  //       },
  //     }
  //   });



  //   var schema = new GraphQLSchema({
  //     query: RootType
  //   });

  //   this.setState({schema});

  //   return schema;
  // }



  
  apiRequest(path, params, options){

    let {
      apiRequest,
    } = this.context;

    return apiRequest(null, true, path, params, options);
  }

  loadSchema(){

    this.apiRequest('schema', {}, {
      callback: (data, errors) => {

        console.log('api schema', data, errors);

        if(data.success && data.object){

          let {
            data: introspectionSchema,
          } = data.object;

          var schema = buildClientSchema(introspectionSchema);

          this.setState({
            schema,
          });
        }

        return;
      }
    })
  }

 	graphQLFetcher(graphQLParams) {
 
 		console.log('graphQLParams', graphQLParams);

 		var body = new FormData();
  

	  for(var i in graphQLParams){

	    var value = graphQLParams[i];

	    if(value === null || value === undefined){
	      continue;
	    }

	    body.append(i, JSON.stringify(value));
	    // body.append(i, value);
	  };

	  return fetch('/api/?pub_action=graphql', {
	    method: 'post',
      credentials: "same-origin",
	    headers: { 'Content-Type': 'application/json' },
	    // body: JSON.stringify(graphQLParams),
	    // body: JSON.stringify(body),
	    body: body,
	  }).then(response => response.json());
	}

	render(){
 
    let {
      schema,
    } = this.state;

    if(!schema){

      return null;
    }

		// const DocumentType = new GraphQLObjectType({
  //     name: 'DocumentType',
  //     fields: {
  //       id: {
  //         type: GraphQLInt
  //       },
  //       pagetitle: {
  //         type: GraphQLString
  //       }, 
  //     }
  //   });
 

  //   const RootType = new GraphQLObjectType({
  //     name: 'RootType',
  //     fields: {
  //       resource: {
  //         type: DocumentType,
  //         args: {
  //           id: {
  //             type: new GraphQLNonNull(GraphQLID)
  //           }
  //         } 
  //       }
  //     }
  //   });
    
    // var schema = new GraphQLSchema({
    //   query: RootType
    // });

  //   var introspectionSchema = {
    // "data": {
    //   "__schema": {
    //     "queryType": {
    //       "name": "RootType"
    //     },
    //     "mutationType": null,
    //     "subscriptionType": null,
    //     "types": [
    //       {
    //         "kind": "OBJECT",
    //         "name": "RootType",
    //         "description": null,
    //         "fields": [
    //           {
    //             "name": "resource",
    //             "description": null,
    //             "args": [
    //               {
    //                 "name": "id",
    //                 "description": null,
    //                 "type": {
    //                   "kind": "NON_NULL",
    //                   "name": null,
    //                   "ofType": {
    //                     "kind": "SCALAR",
    //                     "name": "ID",
    //                     "ofType": null
    //                   }
    //                 },
    //                 "defaultValue": null
    //               }
    //             ],
    //             "type": {
    //               "kind": "OBJECT",
    //               "name": "DocumentType",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "SCALAR",
    //         "name": "ID",
    //         "description": "The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"4\"`) or integer (such as `4`) input value will be accepted as an ID.",
    //         "fields": null,
    //         "inputFields": null,
    //         "interfaces": null,
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "DocumentType",
    //         "description": null,
    //         "fields": [
    //           {
    //             "name": "id",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "Int",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "pagetitle",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "SCALAR",
    //         "name": "Int",
    //         "description": "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. ",
    //         "fields": null,
    //         "inputFields": null,
    //         "interfaces": null,
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "SCALAR",
    //         "name": "String",
    //         "description": "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
    //         "fields": null,
    //         "inputFields": null,
    //         "interfaces": null,
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "__Schema",
    //         "description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
    //         "fields": [
    //           {
    //             "name": "types",
    //             "description": "A list of all types supported by this server.",
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "LIST",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "NON_NULL",
    //                   "name": null,
    //                   "ofType": {
    //                     "kind": "OBJECT",
    //                     "name": "__Type",
    //                     "ofType": null
    //                   }
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "queryType",
    //             "description": "The type that query operations will be rooted at.",
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "OBJECT",
    //                 "name": "__Type",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "mutationType",
    //             "description": "If this server supports mutation, the type that mutation operations will be rooted at.",
    //             "args": [],
    //             "type": {
    //               "kind": "OBJECT",
    //               "name": "__Type",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "subscriptionType",
    //             "description": "If this server support subscription, the type that subscription operations will be rooted at.",
    //             "args": [],
    //             "type": {
    //               "kind": "OBJECT",
    //               "name": "__Type",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "directives",
    //             "description": "A list of all directives supported by this server.",
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "LIST",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "NON_NULL",
    //                   "name": null,
    //                   "ofType": {
    //                     "kind": "OBJECT",
    //                     "name": "__Directive",
    //                     "ofType": null
    //                   }
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "__Type",
    //         "description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
    //         "fields": [
    //           {
    //             "name": "kind",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "ENUM",
    //                 "name": "__TypeKind",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "name",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "description",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "fields",
    //             "description": null,
    //             "args": [
    //               {
    //                 "name": "includeDeprecated",
    //                 "description": null,
    //                 "type": {
    //                   "kind": "SCALAR",
    //                   "name": "Boolean",
    //                   "ofType": null
    //                 },
    //                 "defaultValue": "false"
    //               }
    //             ],
    //             "type": {
    //               "kind": "LIST",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "NON_NULL",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "OBJECT",
    //                   "name": "__Field",
    //                   "ofType": null
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "interfaces",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "LIST",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "NON_NULL",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "OBJECT",
    //                   "name": "__Type",
    //                   "ofType": null
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "possibleTypes",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "LIST",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "NON_NULL",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "OBJECT",
    //                   "name": "__Type",
    //                   "ofType": null
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "enumValues",
    //             "description": null,
    //             "args": [
    //               {
    //                 "name": "includeDeprecated",
    //                 "description": null,
    //                 "type": {
    //                   "kind": "SCALAR",
    //                   "name": "Boolean",
    //                   "ofType": null
    //                 },
    //                 "defaultValue": "false"
    //               }
    //             ],
    //             "type": {
    //               "kind": "LIST",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "NON_NULL",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "OBJECT",
    //                   "name": "__EnumValue",
    //                   "ofType": null
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "inputFields",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "LIST",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "NON_NULL",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "OBJECT",
    //                   "name": "__InputValue",
    //                   "ofType": null
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "ofType",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "OBJECT",
    //               "name": "__Type",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "ENUM",
    //         "name": "__TypeKind",
    //         "description": "An enum describing what kind of type a given `__Type` is.",
    //         "fields": null,
    //         "inputFields": null,
    //         "interfaces": null,
    //         "enumValues": [
    //           {
    //             "name": "SCALAR",
    //             "description": "Indicates this type is a scalar.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "OBJECT",
    //             "description": "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "INTERFACE",
    //             "description": "Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "UNION",
    //             "description": "Indicates this type is a union. `possibleTypes` is a valid field.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "ENUM",
    //             "description": "Indicates this type is an enum. `enumValues` is a valid field.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "INPUT_OBJECT",
    //             "description": "Indicates this type is an input object. `inputFields` is a valid field.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "LIST",
    //             "description": "Indicates this type is a list. `ofType` is a valid field.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "NON_NULL",
    //             "description": "Indicates this type is a non-null. `ofType` is a valid field.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "SCALAR",
    //         "name": "Boolean",
    //         "description": "The `Boolean` scalar type represents `true` or `false`.",
    //         "fields": null,
    //         "inputFields": null,
    //         "interfaces": null,
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "__Field",
    //         "description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
    //         "fields": [
    //           {
    //             "name": "name",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "String",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "description",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "args",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "LIST",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "NON_NULL",
    //                   "name": null,
    //                   "ofType": {
    //                     "kind": "OBJECT",
    //                     "name": "__InputValue",
    //                     "ofType": null
    //                   }
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "type",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "OBJECT",
    //                 "name": "__Type",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "isDeprecated",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "deprecationReason",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "__InputValue",
    //         "description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
    //         "fields": [
    //           {
    //             "name": "name",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "String",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "description",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "type",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "OBJECT",
    //                 "name": "__Type",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "defaultValue",
    //             "description": "A GraphQL-formatted string representing the default value for this input value.",
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "__EnumValue",
    //         "description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
    //         "fields": [
    //           {
    //             "name": "name",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "String",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "description",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "isDeprecated",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "deprecationReason",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "OBJECT",
    //         "name": "__Directive",
    //         "description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
    //         "fields": [
    //           {
    //             "name": "name",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "String",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "description",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "locations",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "LIST",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "NON_NULL",
    //                   "name": null,
    //                   "ofType": {
    //                     "kind": "ENUM",
    //                     "name": "__DirectiveLocation",
    //                     "ofType": null
    //                   }
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "args",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "LIST",
    //                 "name": null,
    //                 "ofType": {
    //                   "kind": "NON_NULL",
    //                   "name": null,
    //                   "ofType": {
    //                     "kind": "OBJECT",
    //                     "name": "__InputValue",
    //                     "ofType": null
    //                   }
    //                 }
    //               }
    //             },
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "onOperation",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": true,
    //             "deprecationReason": "Use `locations`."
    //           },
    //           {
    //             "name": "onFragment",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": true,
    //             "deprecationReason": "Use `locations`."
    //           },
    //           {
    //             "name": "onField",
    //             "description": null,
    //             "args": [],
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "isDeprecated": true,
    //             "deprecationReason": "Use `locations`."
    //           }
    //         ],
    //         "inputFields": null,
    //         "interfaces": [],
    //         "enumValues": null,
    //         "possibleTypes": null
    //       },
    //       {
    //         "kind": "ENUM",
    //         "name": "__DirectiveLocation",
    //         "description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
    //         "fields": null,
    //         "inputFields": null,
    //         "interfaces": null,
    //         "enumValues": [
    //           {
    //             "name": "QUERY",
    //             "description": "Location adjacent to a query operation.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "MUTATION",
    //             "description": "Location adjacent to a mutation operation.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "SUBSCRIPTION",
    //             "description": "Location adjacent to a subscription operation.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "FIELD",
    //             "description": "Location adjacent to a field.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "FRAGMENT_DEFINITION",
    //             "description": "Location adjacent to a fragment definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "FRAGMENT_SPREAD",
    //             "description": "Location adjacent to a fragment spread.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "INLINE_FRAGMENT",
    //             "description": "Location adjacent to an inline fragment.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "SCHEMA",
    //             "description": "Location adjacent to a schema definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "SCALAR",
    //             "description": "Location adjacent to a scalar definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "OBJECT",
    //             "description": "Location adjacent to an object type definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "FIELD_DEFINITION",
    //             "description": "Location adjacent to a field definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "ARGUMENT_DEFINITION",
    //             "description": "Location adjacent to an argument definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "INTERFACE",
    //             "description": "Location adjacent to an interface definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "UNION",
    //             "description": "Location adjacent to a union definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "ENUM",
    //             "description": "Location adjacent to an enum definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "ENUM_VALUE",
    //             "description": "Location adjacent to an enum value definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "INPUT_OBJECT",
    //             "description": "Location adjacent to an input object type definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           },
    //           {
    //             "name": "INPUT_FIELD_DEFINITION",
    //             "description": "Location adjacent to an input object field definition.",
    //             "isDeprecated": false,
    //             "deprecationReason": null
    //           }
    //         ],
    //         "possibleTypes": null
    //       }
    //     ],
    //     "directives": [
    //       {
    //         "name": "include",
    //         "description": "Directs the executor to include this field or fragment only when the `if` argument is true.",
    //         "locations": [
    //           "FIELD",
    //           "FRAGMENT_SPREAD",
    //           "INLINE_FRAGMENT"
    //         ],
    //         "args": [
    //           {
    //             "name": "if",
    //             "description": "Included when true.",
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "defaultValue": null
    //           }
    //         ]
    //       },
    //       {
    //         "name": "skip",
    //         "description": "Directs the executor to skip this field or fragment when the `if` argument is true.",
    //         "locations": [
    //           "FIELD",
    //           "FRAGMENT_SPREAD",
    //           "INLINE_FRAGMENT"
    //         ],
    //         "args": [
    //           {
    //             "name": "if",
    //             "description": "Skipped when true.",
    //             "type": {
    //               "kind": "NON_NULL",
    //               "name": null,
    //               "ofType": {
    //                 "kind": "SCALAR",
    //                 "name": "Boolean",
    //                 "ofType": null
    //               }
    //             },
    //             "defaultValue": null
    //           }
    //         ]
    //       },
    //       {
    //         "name": "deprecated",
    //         "description": "Marks an element of a GraphQL schema as no longer supported.",
    //         "locations": [
    //           "FIELD_DEFINITION",
    //           "ENUM_VALUE"
    //         ],
    //         "args": [
    //           {
    //             "name": "reason",
    //             "description": "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/).",
    //             "type": {
    //               "kind": "SCALAR",
    //               "name": "String",
    //               "ofType": null
    //             },
    //             "defaultValue": "\"No longer supported\""
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
  // };
		
		// var schema = new GraphQLSchema();


    // graphql(schema, introspectionQuery).then(result => {
    //   // fs.writeFileSync(
    //   //   `${yourSchemaPath}.json`,
    //   //   JSON.stringify(result, null, 2)
    //   // );

    //   // console.log("introspectionQuery 2", result);
    //   console.log("introspectionQuery", JSON.stringify(result, null, 2));
    // });

    // return null;

		return <GraphiQL
			schema={schema}
			defaultQuery="query{
			  users {
			    id
			    username
			    fullname
			  }
			}"
			fetcher={::this.graphQLFetcher} 
		/>;
	}
}

