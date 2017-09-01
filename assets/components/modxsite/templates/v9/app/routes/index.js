

import {
  MainApp,
  MainPage,
  TopicsPage,
  // Lesson1,
  // PageGraphiQL,
} from "modules/Site";

// console.log('AppB', AppB);

// App.contextTypes = { store: React.PropTypes.object };

export default {
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
      path: "/",
      name: "TopicsPage",
      component: MainPage
    },
    {
      path: "/topics/",
      name: "TopicsPage",
      component: TopicsPage
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
    {
      path: "*",
      // name: "notfound",
      component: MainPage
    }
  ]
};
