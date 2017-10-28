

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
    //   component: MainPage
    // },
    {
      path: "/index",
      component: MainPage
    },
    {
      path: "/index/@:lat,:lng,:zoom",
      component: MainPage
    },
    {
      path: "/@:lat,:lng,:zoom",
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
      childRoutes: [
        {
          path: "/bani-otzivy/:topicAlias",
          // component: CompaniesPage,
        },
        {"path":"/moscow/:companyId/solyanyie-peshheryi-v-bannom-komplekse-sokolinaya-gora-1294.html"},


        {"path":"/kuncevskie-bani"},
        {"path":"/izmajlovskie-bani"},
        {"path":"/rzhevskie-bani"},
        {"path":"/pokrovskie-bani"},
        {"path":"/usachevskie-bani"},
        {"path":"/voroncovskie-bani"},
        {"path":"/varshavskie-bani"},
        {"path":"/babushkinskie-bani"},
        {"path":"/city\/moscow\/rzhevskie-bani\/rzhevskie-bani-zhutkoe-mesto-1387.html"},
        {"path":"/bannyj-klub-solovyov"},
        {"path":"/koptevskie-bani"},
        {"path":"/krasnopresnenskie-bani"},
        {"path":"/astraxanskie-bani"},
        {"path":"/seleznevskie-bani"},
        {"path":"/vostochnye-bani"},
        {"path":"/reutovskie-bani"},
        {"path":"/shhelkovskie-bani"},
        {"path":"/banya-na-ciolkovskogo-banya-2"},
        {"path":"/ivanovskaya-banya"},
        {"path":"/banya-na-raxmaninova"},
        {"path":"/kazachi-bani"},
        {"path":"/voroncovskie-bani-staraya-statya"},
        {"path":"/banya-na-krasnoznamennoj"},
        {"path":"/vodno-razvlekatelnyj-klub-atlantidaspa"},
        {"path":"/city\/moscow\/babushkinskie-bani\/babushkinskie-bani-zhut!-1437.html"},



        // {"path":"/rabota-dlya-vsex"},
        // {"path":"/predlozhenie-dlya-vladelcev-saun"},
        // {"path":"/kuncevskie-bani"},
        // {"path":"/izmajlovskie-bani"},
        // {"path":"/rzhevskie-bani"},
        // {"path":"/pokrovskie-bani"},
        // {"path":"/usachevskie-bani"},
        // {"path":"/voroncovskie-bani"},
        // {"path":"/varshavskie-bani"},
        // {"path":"/babushkinskie-bani"},
        // {"path":"/city/moscow/rzhevskie-bani/rzhevskie-bani-zhutkoe-mesto-1387.html"},
        // {"path":"/bannyj-klub-solovyov"},
        // {"path":"/koptevskie-bani"},
        // {"path":"/krasnopresnenskie-bani"},
        // {"path":"/astraxanskie-bani"},
        // {"path":"/seleznevskie-bani"},
        // {"path":"/vostochnye-bani"},
        // {"path":"/reutovskie-bani"},
        // {"path":"/shhelkovskie-bani"},
        // {"path":"/banya-na-ciolkovskogo-banya-2"},
        // {"path":"/ivanovskaya-banya"},
        // {"path":"/banya-na-raxmaninova"},
        // {"path":"/kazachi-bani"},
        // {"path":"/voroncovskie-bani-staraya-statya"},
        // {"path":"/rimskie-bani"},
        // {"path":"/yaponskie-bani"},
        // {"path":"/tureckaya-banya-xamam"},
        // {"path":"/finskaya-sauna"},
        // {"path":"/banya-na-krasnoznamennoj"},
        // {"path":"/vodno-razvlekatelnyj-klub-atlantidaspa"},
        // // {"path":"/moscow/bannyij-kompleks-«sokolinaya-gora»/solyanyie-peshheryi-v-bannom-komplekse-sokolinaya-gora-1294.html"},
        // // {"path":"/moscow/bannyij-kompleks-«sokolinaya-gora»/solyanyie-peshheryi-v-bannom-komplekse-sokolinaya-gora-1294.html"},
        // // {"path":"/moscow/bannyij-kompleks-«sokolinaya-gora»/solyanyie-peshheryi-v-bannom-komplekse-sokolinaya-gora-1294.html"},
        // // {"path":"/moscow/bannyij-kompleks-\u00absokolinaya-gora\u00bb/solyanyie-peshheryi-v-bannom-komplekse-sokolinaya-gora-1294.html"},
        // {"path":"/city/moscow/babushkinskie-bani/babushkinskie-bani-zhut!-1437.html"},


      ]
    },
    {
      path: "/topics",
      component: TopicsPage,
      childRoutes: [
        {
          path: "/topics/:topicAlias",
          // component: CompaniesPage,
        },
        {"path":"/rabota-dlya-vsex"},
        {"path":"/predlozhenie-dlya-vladelcev-saun"},
        {"path":"/rimskie-bani"},
        {"path":"/yaponskie-bani"},
        {"path":"/tureckaya-banya-xamam"},
        {"path":"/finskaya-sauna"},

      ],
    },
    {
      path: "/tag/:tag",
      component: TopicsPage,
    },
    {
      path: "/comments",
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
    // {
    //   path: "/office",
    //   component: UsersPage,
    //   childRoutes: [{
    //     path: "/office/:section",
    //     childRoutes: [{
    //       path: "/profile/:section/:action",
    //     }],
    //   }],
    // },
    {
      path: "/profile",
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
      path: "/crm",
      name: "CRM",
      component: CRMPage,
    },

    // {
    //   path: "/:city",
    // },
    // {
    //   path: "/:city/@:lat,:lng,:zoom",
    //   component: MainPage
    // },
    {
      "path":"/moscow",
      "component":MainPage,
      childRoutes: [
        {
          path: "/:city",
        },
        {
          path: "/:city/@:lat,:lng,:zoom",
          component: MainPage
        },
      ]
    },
    {
      path: "/moscow/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/moskovskaya-oblast/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/cherepovecz/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/penza/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/st-petersburg/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompaniesPage,
    },
    // {
    //   "path":"/moskovskaya-oblast",
    //   "component":MainPage,
    // },
    // {"path":"/penza","component":MainPage},
    // {"path":"/st-petersburg","component":MainPage},
    // {"path":"/chelyabinsk","component":MainPage},
    // {"path":"/cherepovecz","component":MainPage},
 


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