import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import DashboardVendors from '../components/DashboardVendors.vue'
import Dashboard from '../components/Dashboard.vue'
import DashboardTutorial from '../components/DashboardTutorial.vue'
import Payments from '../components/Payments.vue'
import KeyAccountManager from '../components/KeyAccountManager.vue'
import Products from '../components/Products.vue'
import ChangePassword from '../components/ChangePassword.vue'
import TransactionReport from '../components/TransactionReport.vue'
import ProductReport from '../components/ProductReport.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        alias: '/login', 
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard-vendors',
        name: 'DashboardVendors',
        component: DashboardVendors
    },
    // {
    //     path: '/dashboard',
    //     // redirect: '/dashboard-tutorial',
    //     name: 'Dashboard',
    //     component: Dashboard,
    //     props: true, 
    // },
    {
        path: '/dashboard',
        redirect: '/dashboard/dashboard-tutorial',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            {
                path: '/dashboard/dashboard-tutorial',
                name: 'DashboardTutorial',
                component: DashboardTutorial,
                meta: {title: 'Dashboard tutorial'}
            },
            {
                path: '/dashboard/key-manager',
                name: 'KeyAccountManager',
                component: KeyAccountManager,
                meta: {title: 'Key Account Manager'}
            },
            {
                path: '/dashboard/payments',
                name: 'Payments',
                component: Payments,
                meta: {title: 'Payments'}
            },
            {
                path: '/dashboard/products',
                name: 'Products',
                component: Products,
                meta: {title: 'Products'}
            }, 
            {
                path: '/dashboard/reset-password',
                name: 'ChangePassword',
                component: ChangePassword,
                meta: {title: 'Change Password'}
            },
            {
                path: '/dashboard/transaction-report',
                name: 'TransactionReport',
                component: TransactionReport,
                meta: {title: 'Transactions Report'}
            },
            {
                path: '/dashboard/product-report',
                name: 'ProductReport',
                component: ProductReport,
                meta: {title: 'Products Report'}
            }
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router