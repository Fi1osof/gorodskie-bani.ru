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

import moment from 'moment';

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


const RedirectType = new GraphQLObjectType({
  name: 'RedirectType',
  description: "Редиректы",
  fields: () => {

    return {
      id: {
        type: GraphQLInt,
        description: "ID",
      },
      uri: {
        type: GraphQLString,
        description: "УРЛ, для которого настроено правило",
      },
      redirect_uri: {
        type: GraphQLString,
        description: "УРЛ, куда должен быть выполнен редирект",
      },
      resource_id: {
        type: GraphQLInt,
        description: "ID Документа, для которого настроено правило",
      },
    };

  },
});

export default RedirectType;


// export const getList = (source, args, context, info) => {

//   const {
//     CompaniesStore,
//     TopicsStore,
//     ResourcesStore,
//   } = context.state;

//   const {
//     parent,
//     template,
//     tag,
//     resourceType,
//   } = args;
 
//   let state

//   switch(resourceType){

//     case 'topic':
//     case 'obzor':
    
//       state = TopicsStore.getState();
      
//       break;

//     case 'company':
    
//       state = CompaniesStore.getState();

//       break;

//     default: state = ResourcesStore.getState();
//   }


//   if(parent){

//     state = state.filter(n => n.parent === parent);

//   }

//   if(template){

//     state = state.filter(n => n.template === template);

//   }

//   if(tag){

//     const search = new RegExp(tag, 'ui');

//     state = state.filter(n => n.tags && n.tags.findIndex(i => i.match(search)) !== -1);

//   }

//   return state;

// };
