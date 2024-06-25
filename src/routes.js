import { createWebHistory, createRouter } from "vue-router";

// ###### App Routes ######
import IndexLayout from "./components/IndexLayout.vue";
import Index from './view/Index.vue'
import Category from "./view/Category.vue";
import CategoryFoods from "./view/CategoryFoods.vue";
import Foods from "./view/Foods.vue";
import FoodSearch from "./view/FoodSearch.vue";
import MyOrder from "./view/MyOrder.vue";

// ###### Auth Routes ######
import AuthLayout from "./view/auth/AuthLayout.vue";
import Login from "./view/auth/Login.vue";
import SignUp from "./view/auth/SignUp.vue";
import Order from "./view/auth/Order.vue";
import UpdateOrder from "./view/auth/UpdateOrder.vue";

// ###### 404 Route ######
import PNF404 from "./components/NotFound.vue";

const routes =
    [
        // ###### App Routes ######
        {
            path: '/',
            component: IndexLayout,
            children:
                [
                    {
                        path: '/',
                        name: 'Index',
                        component: Index
                    },
                    {
                        path: '/category',
                        name: 'Category',
                        component: Category
                    },
                    {
                        path: '/category-foods/:id',
                        name: 'CategoryFoods',
                        component: CategoryFoods
                    },
                    {
                        path: '/foods',
                        name: 'Foods',
                        component: Foods
                    },
                    {
                        path: '/food-search/:id',
                        name: 'FoodSearch',
                        component: FoodSearch
                    },
                    {
                        path: '/my-order',
                        name: 'MyOrder',
                        component: MyOrder
                    },
                ]
        },

        // ###### Auth Routes ######
        {
            path: '/auth',
            redirect: '/login',
            component: AuthLayout,
            children:
                [
                    {
                        path: '/login',
                        name: 'Login',
                        component: Login
                    },
                    {
                        path: '/sign-up',
                        name: 'SignUp',
                        component: SignUp
                    },
                    {
                        path: '/order/:id',
                        name: 'Order',
                        component: Order
                    },
                    {
                        path: '/update-order/:id/:oid',
                        name: 'UpdateOrder',
                        component: UpdateOrder
                    }
                ]
        },

        // ###### 404 Route ######
        {
            name: 'PNF404',
            path: '/:pathMatch(.*)*',
            component: PNF404
        }
    ];

const router = createRouter
    (
        {
            history: createWebHistory(),
            routes,
            // For Jump on the Top
            scrollBehavior(to, from, savedPosition) {
                return { top: 0 }
            }
        }
    );
export default router;