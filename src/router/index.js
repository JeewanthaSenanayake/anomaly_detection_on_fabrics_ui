import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import TestingView from '@/views/TestingView.vue';
import HistoryView from '@/views/HistoryView.vue';
import ProductView from '@/views/ProductView.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/testing',
    name: 'TestingView',
    component: TestingView
  },
  {
    path: '/production_history',
    name: 'HistoryView',
    component: HistoryView
  },
  {
    path: '/view_product/:id',
    name: 'ProductView',
    component: ProductView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
