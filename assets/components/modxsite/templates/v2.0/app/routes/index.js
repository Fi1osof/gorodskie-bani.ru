

import {
  MainApp,
  MapPage,
  MainPage,
  TopicsPage,
  TopicCreatePage,
  TopicPage,
  NotFoundPage,
  // DbPage,
  CompaniesPage,
  CompanyPage,
  CompanyCreatePage,
  OtzivyPage,
  OtzivPage,
  UsersPage,
  UserPage,
  CommentsPage,
  CommentPage,
  RatingsPage,
  ContactsPage,
  CRMPage,
  CompaniesEditsPage,
  CitiesPage,
} from "modules/Site";

// console.log("CompanyCreatePage", CompanyCreatePage);

let routes = {
  path: "/",
  component: MainApp,
  indexRoute: { 
    component: MainPage 
  },
  childRoutes: [
    {
      path: "/",
      component: MainPage,
      childRoutes: [
        {
          path: "/index",
        },
        {
          path: "/@:lat,:lng,:zoom",
        },
        {
          path: "/index/@:lat,:lng,:zoom",
        },
      ],
    },
    {
      path: "/city",
      component: CitiesPage,
      childRoutes: [
        {
          path: "/city/@:lat,:lng,:zoom",
        },
      ],
    },
    {
      path: "/*/@:lat,:lng,:zoom",
      component: MapPage,
      childRoutes: [
        {
        // },{
        //   path: "/:city/@:lat,:lng,:zoom",
        },{
          path: "/city/:city/@:lat,:lng,:zoom",
        },
        // {
        // },
      ],
    },
    // {
    //   path: "/db",
    //   component: DbPage,
    // },
    {
      path: "/bani-otzivy/:topicAlias",
      component: OtzivPage,
      childRoutes: [
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
      ]
    },
    {
      path: "/bani-otzivy",
      component: OtzivyPage,
    },
    {
      path: "/topics/create",
      component: TopicCreatePage,
    },
    {
      path: "/topics/:topicAlias",
      component: TopicPage,
      childRoutes: [
        // {
        //   path: "/topics/:topicAlias",
        // },
        {"path":"/rabota-dlya-vsex"},
        {"path":"/predlozhenie-dlya-vladelcev-saun"},
        {"path":"/rimskie-bani"},
        {"path":"/yaponskie-bani"},
        {"path":"/tureckaya-banya-xamam"},
        {"path":"/finskaya-sauna"},

      ],
    },
    {
      path: "/topics",
      component: TopicsPage,
      childRoutes: [{
        path: "/tag/:tag",
      }],
    },
    // {
    //   path: "/tag/:tag",
    //   component: TopicsPage,
    // },
    {
      path: "/comments/comment-:commentId.html",
      component: CommentPage,
    },
    {
      path: "/comments",
      component: CommentsPage,
    },
    {
      path: "/profile/:username",
      component: UserPage,
      childRoutes: [{
        path: "/profile/:username/:action",
      }],
    },
    {
      path: "/people",
      component: UsersPage,
    },
    {
      path: "/edits",
      description: "Изменения в данных заведений",
      component: CompaniesEditsPage,
    },
    {
      path: "/profile",
    },
    {
      path: "/bani/create",
      component: CompanyCreatePage,
    },
    {
      path: "/bani/:companyId",
      component: CompanyPage,
    },
    {
      path: "/bani",
      component: CompaniesPage,
      // childRoutes: [{
      //   path: "/bani/:companyId",
      // }],
    },
    {
      path: "/st-petersburg/:companyId",
      component: CompanyPage,
    },
    // {
    //   path: "/city/:city/@:lat,:lng,:zoom",
    //   component: MapPage,
    //   // component: CompaniesPage,
    // },
    {
      path: "/city/:city",
      // component: MapPage,
      component: CompaniesPage,
      // childRoutes: [{
      //   // path: "/city/:city/:companyId",
      // }],
    },
    {
      path: "/city/*/:companyId",
      component: CompanyPage,
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
    {
      // "path":"/moscow",
      // "component":MapPage,
      component: CompaniesPage,
      childRoutes: [
        {
          path: "/:city",
        },
      ]
    },
    {
      path: "/moscow/:companyId",
      component: CompanyPage,
    },
    {
      path: "/moskovskaya-oblast/:companyId",
      component: CompanyPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompanyPage,
    },
    {
      path: "/cherepovecz/:companyId",
      component: CompanyPage,
    },
    {
      path: "/penza/:companyId",
      component: CompanyPage,
    },
    {
      path: "/st-petersburg/:companyId",
      component: CompanyPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompanyPage,
    },
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