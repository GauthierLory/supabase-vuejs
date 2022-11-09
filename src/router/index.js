import * as VueRouter from "vue-router";

import HomePage from '../pages/Home.vue'
import AccountPage from '../pages/Account.vue'
import NotFoundPage from '../pages/NotFound.vue'
import AuthPage from '../pages/Auth.vue'
import RegisterPage from '../pages/Register.vue'
import ForgotPasswordPage from '../pages/ForgotPassword.vue'
import UpdatePassword from '../pages/UpdatePassword.vue'
import useAuthUser from "../composables/useAuthUser.js";

const routes = [
    {
        name: "Home",
        path: '/',
        component: HomePage
    },
    {
        name: "ForgotPassword",
        path: "/forgotPassword",
        component: ForgotPasswordPage,
    },
    {
        name: "UpdatePassword",
        path: "/update-password",
        component: UpdatePassword,
    },
    {
        name: "Me",
        path: '/profile',
        component: AccountPage
    },
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
    },
    {
        name: "NotFound",
        path: "/notfound",
        component: NotFoundPage
    },
    {
        path: "/:wrongPath(.*)",
        redirect: (to) => {
            return { name: "NotFound", params: { wrongPath: to.params.wrongPath } };
        },
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router;