import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

// Create an http link:

const link = new HttpLink({
  uri:
    process.env.NODE_ENV == "production"
      ? "https://vacant.astoria.app/graphql"
      : "http://localhost:3000/graphql",
  fetch
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: true
  })
});

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: client
});

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
