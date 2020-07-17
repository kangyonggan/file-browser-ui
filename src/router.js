import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/*',
                meta: {
                    permission: true
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});

export default router;
export {routers};