

import {
  MainApp,
  MainPage,
  TopicsPage,
  NotFoundPage,
  DbPage,
  CompaniesPage,
  OtzivyPage,
  UsersPage,
  CommentsPage,
  RatingsPage,
  ContactsPage,
  CRMPage,
  // Lesson1,
  // PageGraphiQL,
} from "modules/Site";

// console.log('AppB', AppB);

// App.contextTypes = { store: React.PropTypes.object };

let routes = {
  path: "/",
  component: MainApp,
  indexRoute: { 
    component: MainPage 
  },
  childRoutes: [
    // {
    //   path: "/react-lessons/",
    //   name: "MainPage",
    //   component: MainPage
    // },
    {
      path: "/index",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/@:lat,:lng,:zoom",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/db",
      component: DbPage,
      // childRoutes: [
      //   {
      //     path: "/db/contacts",
      //     name: "/db/contacts",
      //     component: Contacts,
      //     childRoutes: [{
      //       path: "/db/contacts/:contactId/",
      //     }]
      //   },
      //   {
      //     path: "/db/places",
      //     name: "/db/places",
      //     component: Places,
      //     childRoutes: [{
      //       path: "/db/places/:placeId/",
      //     }]
      //   },
      //   {
      //     path: "/db/services",
      //     name: "/db/services",
      //     component: Services,
      //     childRoutes: [{
      //       path: "/db/services/:serviceId/",
      //     }]
      //   },
      //   {
      //     path: "/db/places-services",
      //     name: "/db/places-services",
      //     component: Page66
      //   },
      //   {
      //     path: "/db/sources",
      //     name: "/db/sources",
      //     component: Page72
      //   }
      // ]
    },
    {
      path: "/bani-otzivy",
      component: OtzivyPage,
      childRoutes: [{
        path: "/bani-otzivy/:topicAlias",
        // component: CompaniesPage,
      }]
    },
    {
      path: "/topics",
      component: TopicsPage,
      childRoutes: [{
        path: "/topics/:topicAlias",
        // component: CompaniesPage,
      }],
    },
    {
      path: "/tag/:tag",
      component: TopicsPage,
    },
    {
      path: "/comments/",
      component: CommentsPage,
      childRoutes: [{
        path: "/comments/comment-:commentId.html",
        // component: CompaniesPage,
      }]
    },
    {
      path: "/people",
      component: UsersPage,
      childRoutes: [{
        path: "/profile/:username",
        // component: CompaniesPage,
        // component: UsersPage,
        childRoutes: [{
          path: "/profile/:username/:action",
          // component: CompaniesPage,
          // component: UsersPage,
        }],
      }],
    },
    {
      path: "/profile/",
    },
    {
      // path: "/bani/",
      childRoutes: [{
        path: "/bani/:companyId",
        component: CompaniesPage,
      }],
      // childRoutes: [{
      //   path: "/city/:city/:companyId/",
      //   component: CompaniesPage,
      // }],
    },
    {
      childRoutes: [{
        path: "/chelyabinsk/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      childRoutes: [{
        path: "/chelyabinsk/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      childRoutes: [{
        path: "/moscow/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      childRoutes: [{
        path: "/st-petersburg/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      path: "/city/:city/@:lat,:lng,:zoom",
      component: MainPage
    },
    {
      childRoutes: [{
        path: "/city/:city/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      path: "/city/:city",
      component: MainPage
    },
    {
      path: "/ratings",
      component: RatingsPage,
      childRoutes: [{
        path: "/ratings/:ratingType",
      }]
    },
    {
      path: "/contacts.html",
      name: "Contacts",
      component: ContactsPage,
    },
    {
      path: "/crm/",
      name: "CRM",
      component: CRMPage,
    },
    // {
    //   path: "/react-lessons/lesson1",
    //   name: "Lesson1",
    //   component: Lesson1
    // },
    // {
    //   path: "/react-lessons/lesson2",
    //   name: "GraphiQL",
    //   component: PageGraphiQL
    // },
    // {
    //   path: "*",
    //   // name: "notfound",
    //   component: NotFoundPage,
    // }
  ]
};

if(typeof window !== 'undefined'){
  routes.childRoutes.push({
    path: "*",
    // name: "notfound",
    component: NotFoundPage,
    // redirect: '/'
  });
}

export default routes;