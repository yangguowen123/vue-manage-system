const auditOrderRoute = [
    {
        path: '/audit-order',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/auditOrder/AuditOrder.vue'),
        meta: { title: '审核' }
    }
];

export default auditOrderRoute;