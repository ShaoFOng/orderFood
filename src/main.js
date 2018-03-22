import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import login from 'components/login/login';
import register from 'components/register/register';
import main_head from 'components/header/main_head';
import home from 'components/home/home';
import search from 'components/search/search';
import personalCenter from 'components/personalCenter/personalCenter';
import order from 'components/order/order';
import myCart from 'components/myCart/myCart';
import infoDetail from 'components/infoDetail/infoDetail';
import passwdChange from 'components/infoDetail/passwdChange';
import changeInfo from 'components/infoDetail/changeInfo';
import loading from 'components/loading/loading';
import loading_svg from 'components/loading/loading_svg';
import orderDetail from 'components/order/orderDetail';
import commend from 'components/commend/commend';
import showCommend from 'components/commend/showCommend';
import 'common/stylus/index.styl';


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
// Vue.http.options.emulateHTTP = true;
// Vue.http.options.emulateJSON = true;
const routes = [{
  path: '/',
  redirect: '/login',
}, {
  path: '/goods',
  component: goods,
  name: 'goods',
  meta: { requiresAuth: true }
}, {
  path: '/ratings',
  component: ratings,
  meta: { requiresAuth: true }
}, {
  path: '/seller',
  component: seller,
  meta: { requiresAuth: true }
}, {
  path: '/login',
  component: login
},{
  path: '/main_head',
  component: main_head
},{
  path: '/register',
  component: register
},{
  path: '/home',
  component: home,
  name: 'home',
  meta: { requiresAuth: true }
},{
  path: '/search',
  component: search,
  meta: { requiresAuth: true }
},{
  path: '/center',
  component: personalCenter,
  meta: { requiresAuth: true }
},{
  path: '/order',
  component: order,
  name: 'order',
  meta: { requiresAuth: true }
},{
  path: '/shoppingCart',
  component: myCart,
  meta: { requiresAuth: true }
},{
  path: '/vipcard',
  component: infoDetail,
  meta: { requiresAuth: true }
},{
  path: '/passwdChange',
  component: passwdChange,
  meta: { requiresAuth: true }
},{
  path: '/changeInfo',
  name: 'changeInfo',
  component: changeInfo,
  meta: { requiresAuth: true }
},{
  path: '/loading',
  component: loading
},{
  path: '/loading2',
  component: loading_svg
},{
  path: '/orderDetail',
  name: 'orderDetail',
  component: orderDetail,
  meta: { requiresAuth: true }
},{
  path: '/commend',
  component: commend,
  name: "commend",
  meta: { requiresAuth: true }
},{
  path: '/showCommend',
  name: 'showCommend',
  component: showCommend,
  meta: { requiresAuth: true }
}];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});
//全局导航钩子
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
      window.localStorage.removeItem('_sell_user_id');
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //这里判断用户是否登录，我例子中是验证本地存储是否有token
        if (!localStorage._sell_user_id) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }//显示被拦截的页面
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
