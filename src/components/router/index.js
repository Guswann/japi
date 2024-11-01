import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Categories from "../Categories.vue";
import Product from "../Product.vue";


const routes = [
  {
    path: '/',
    name: 'Home', 
    component: Home, 
  },
  {
    path:'/category',
    name:'Categories',
    component: Categories
  },
  {
    path:'/products',
    name:'Products',
    component: Product
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
