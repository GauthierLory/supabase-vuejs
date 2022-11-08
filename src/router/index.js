import * as VueRouter from "vue-router";

import HomePage from '../pages/Home.vue'
import AccountPage from '../pages/Account.vue'
import AuthPage from '../pages/Auth.vue'
import RegisterPage from '../pages/Register.vue'
import useAuthUser from "../composables/useAuthUser.js";

const routes = [
    {
        name: "Home",
        path: '/',
        component: HomePage
    },
    // {
    //     name: "Me",
    //     path: '/profile',
    //     component: AccountPage,
    // },
    {
        name: "Login",
        path: '/login',
        component: AuthPage,
        beforeEnter: () => {
            if (localStorage.getItem("sb-gemidcqbxyqjybbthjaq-auth-token")) {
                return "/";
            }
        },
    },
    {
        name: "Register",
        path: '/register',
        component: RegisterPage
    },
    {
        name: "Logout",
        path: "/logout",
        beforeEnter: async (to, from) => {
            const { logout } = useAuthUser();
            await logout();
            return {path: "/login"};
        }
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
})

// router.beforeEach((to, from) => {
//     // if (to.meta.needLoggedIn && !localStorage.getItem("isLoggedIn")) {
//     if (!localStorage.getItem("sb-gemidcqbxyqjybbthjaq-auth-token")) {
//         // return "/login";
//         return "/login";
//     }
// })

export default router;