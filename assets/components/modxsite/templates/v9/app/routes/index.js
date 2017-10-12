

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
      path: "/@:lat,:lng,:zoom",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/db/",
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
      path: "/bani-otzivy/",
      component: OtzivyPage,
      childRoutes: [{
        path: "/bani-otzivy/:topicAlias/",
        // component: CompaniesPage,
      }]
    },
    {
      path: "/topics/",
      component: TopicsPage,
      childRoutes: [{
        path: "/topics/:topicAlias",
        // component: CompaniesPage,
      }]
    },
    {
      path: "/comments/",
      component: CommentsPage,
      // childRoutes: [{
      //   path: "/topics/:topicAlias",
      //   // component: CompaniesPage,
      // }]
    },
    {
      path: "/people",
      component: UsersPage,
      childRoutes: [{
        path: "/profile/:username",
        // component: CompaniesPage,
        // component: UsersPage,
      }],
    },
    {
      path: "/profile/",
    },
    {
      // path: "/bani/",
      childRoutes: [{
        path: "/bani/:companyId/",
        component: CompaniesPage,
      }]
    },
    {
      path: "/ratings/",
      component: RatingsPage,
      // childRoutes: [{
      //   path: "/bani/:companyId/",
      //   component: CompaniesPage,
      // }]
    },
    // {
    //   path: "/topics/",
    //   name: "TopicsPage",
    //   component: TopicsPage
    // },
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