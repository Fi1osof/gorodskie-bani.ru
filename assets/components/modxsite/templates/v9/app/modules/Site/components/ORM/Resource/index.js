import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

// import {
//   // SchemaObject,
//   // order,
//   // ModelObject,
// } from '../';

import moment from 'moment';

// moment.locale('ru');

import ModelObject from '../object';

import {
  CommentType,
} from '../Comment';

import {
  RatingType,
} from '../Rating';

import {
  UserType,
} from '../User';

import {
  imageType,
  coordsType,
  SortField,
  TVsField,
  GalleryField,
} from '../fields';


export const ResourceType = new GraphQLObjectType({
  name: 'ResourceType',
  fields: () => {

    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString,
        resolve: (source) => {
          return source.pagetitle;
        },
      },
      pagetitle: {
        type: GraphQLString
      },
      longtitle: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      summary: {
        type: GraphQLString
      },
      introtext: {
        type: GraphQLString
      },
      short_text: {
        type: GraphQLString
      },
      content: {
        type: GraphQLString
      },
      alias: {
        type: GraphQLString
      },
      uri: {
        type: GraphQLString
      },
      createdby: {
        type: GraphQLInt,
        description: "ID автора ресурса",
      },
      image: {
        type: GraphQLString,
        description: "Картинка",
      },
      topic_tags: {
        type: GraphQLString,
        description: "Теги",
      },
      topic_tags_array: {
        type: new GraphQLList(GraphQLString),
        description: "Теги, разбитые на массив",
        resolve: (source) => {
          return source.topic_tags && source.topic_tags.split(",");
        },
      },
      imageFormats: imageType,
      city_id: {
        type: GraphQLInt
      },
      city: {
        type: GraphQLString
      },
      parent: {
        type: GraphQLInt,
        description: "ID родительского документа",
      },
      template: {
        type: GraphQLInt,
        description: "ID шаблона",
      },
      deleted: {
        type: GraphQLBoolean,
        description: "Флаг, что документ удален",
        resolve: (source) => {
          return parseInt(source.deleted) === 1 ? true : false;
        },
      },
      hidemenu: {
        type: GraphQLBoolean,
        description: "Флаг, что документ скрывается в меню",
        resolve: (source) => {
          return parseInt(source.hidemenu) === 1 ? true : false;
        },
      },
      createdon: {
        type: GraphQLInt,
        description: "Дата создания в секундах",
      },
      publishedon: {
        type: GraphQLInt,
        description: "Дата публикации в секундах",
      },
      pubdate: {
        type: GraphQLString,
        description: 'Дата публикации',
        resolve: (source, args) => {

          let time = source && (source.publishedon || source.createdon);

          if(!time){
            return null;
          }

          return moment(time * 1000).format('YYYY-MM-DD') || null;
        },
      },
      published: {
        type: GraphQLBoolean,
        description: "Флаг, что документ опубликован",
        resolve: (source) => {
          return parseInt(source.published) === 1 ? true : false;
        },
      },
      tvs: TVsField,
      gallery: GalleryField,
      coords: {
        type: coordsType,
      },
      // coords: {
      //   type: coordsType,
      //   resolve: (source) => {

      //     let {
      //       coords,
      //     } = source;

      //     if(coords && coords.lat === undefined){

      //       const {
      //         0: lng,
      //         1: lat,
      //       } = coords;

      //       coords = {
      //         lat,
      //         lng,
      //       };

      //     }

      //     return coords;
      //   },
      // },
      votes: {
        description: 'Все голоса по документу',
        type: new GraphQLList(RatingType),
        resolve: async (company, args, context, info) => {

          const {
            localQuery,
          } = context;

          const {
            id: company_id,
          } = company;

          Object.assign(args, {
            ratingResourceId: company_id,
          });

          let result;

          await localQuery({
            operationName: "ResourceRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratings,
              } = r.data;

              // console.log("ResourceRatings", args, r);

              result = ratings;

            });

          return result;

          // return this.RatingsResolver(company, args);
        },
      },
      ratingsByType: {
        description: 'Рейтинг по типам',
        type: new GraphQLList(RatingType),
        resolve: async (company, args, context, info) => {

          // 

          const {
            localQuery,
          } = context;

          const {
            id: company_id,
          } = company;

          Object.assign(args, {
            ratingResourceId: company_id,
            getByTypeRatings: true,
          });

          let result;

          await localQuery({
            operationName: "ResourceRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratingsByType,
              } = r.data;

              // console.log("ResourceRatings", args, r);

              result = ratingsByType;

            });

          return result;

          // return this.RatingsResolver(company, args);
        },
      },
      comments: {
        type: new GraphQLList(CommentType),
        description: CommentType.description,
        args: {
          sort: SortField,
        },
        resolve: async (source, args, context, info) => {
 
          // let result;

          const {
            localQuery,
          } = context;

          const {
            id: commentsCompanyId,
          } = source;

          if(!commentsCompanyId){
            return null;
          }

          const {
            sort: commentsSort,
          } = args;

          Object.assign(args, {
            resource_id: commentsCompanyId,
            sort: commentsSort,
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);
        },
        // resolve: async (source, args, context, info) => {
 
        //   let result;

        //   const {
        //     localQuery,
        //   } = context;

        //   const {
        //     id: commentsResourceId,
        //   } = source;

        //   if(!commentsResourceId){
        //     return null;
        //   }

        //   const {
        //     sort: commentsSort,
        //   } = args;

        //   Object.assign(args, {
        //     commentsResourceId,
        //     commentsSort,
        //   });

        //   console.log('ResourceComments', args);

        //   await localQuery({
        //     // query: q,
        //     operationName: "ResourceComments",
        //     variables: args,
        //   })
        //     .then(r => {

        //       const {
        //         comments,
        //       } = r.data;

        //       result = comments;

        //     });

        //   return result;
        // },
      },
      ratings: {
        type: new GraphQLList(RatingType),
        description: RatingType.description,
      },
      ratingAvg: {
        description: 'Суммарный рейтинг',
        type: RatingType,
        // args: {
        //   groupBy: {
        //     type : RatingGroupbyEnum,
        //   },
        // },
        resolve: async (source, args, context, info) => {

          // 

          let result;

          const {
            localQuery,
          } = context;

          const {
            id: ratingResourceId,
          } = source;

          Object.assign(args, {
            ratingResourceId,
          });

          await localQuery({
            operationName: "ResourceAvgRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratings,
              } = r.data;

              result = ratings && ratings[0];

              return result;

            }).catch(e => {
              console.error(e);
            });

          return result;

        },
      },
      Author: {
        type: UserType,
        description: UserType.description,
        resolve: async (source, args, context, info) => {

          const {
            fieldName,
          } = info;

          const {
            rootResolver,
          } = context;

          const {
            createdby: userId,
          } = source;

          if(!userId){
            return null;
          }

          Object.assign(args, {
            id: userId,
          });

          return rootResolver(null, args, context, info);
        },
      },
    }
  }
});


export const getList = (source, args, context, info) => {

  const {
    CompaniesStore,
    TopicsStore,
    ResourcesStore,
  } = context.state;

  const {
    parent,
    template,
    resourceType,
  } = args;
 
  let state

  switch(resourceType){

    case 'topic':
    
      state = TopicsStore.getState();
      
      break;

    case 'company':
    
      state = CompaniesStore.getState();

      break;

    default: state = ResourcesStore.getState();
  }


  if(parent){

    state = state.filter(n => n.parent === parent);

  }

  if(template){

    state = state.filter(n => n.template === template);

  }

  return state;

};
