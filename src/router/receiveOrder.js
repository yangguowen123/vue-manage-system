const receiveOrderRoute = [
    {
        path: '/receive-order',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/receiveOrder/ReceiveOrder.vue'),
        meta: { title: '接单' }
    }
];

export default receiveOrderRoute;