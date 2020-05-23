const mineRoute = [
    {
        path: '/recharge',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/Recharge.vue'),
        meta: { title: '充值' }
    },
    {
        path: '/withdraw',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/Withdraw.vue'),
        meta: { title: '提现' }
    },
    {
        path: '/withdraw-bank-card',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/WithdrawBankCard.vue'),
        meta: { title: '提现到银行卡' }
    },
    {
        path: '/withdraw-virtual-wallet',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/WithdrawVirtualWallet.vue'),
        meta: { title: '提现到电子钱包' }
    },
    {
        path: '/gathering-code',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/GatheringCode.vue'),
        meta: { title: '收款码' }
    },
    {
        path: '/realname-certification',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/RealnameCertification.vue'),
        meta: { title: '实名认证' }
    },
    {
        path: '/personal-info',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/PersonalInfo.vue'),
        meta: { title: '个人中心' }
    },
    {
        path: '/bank-card',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/BankCard.vue'),
        meta: { title: '我的银行卡' }
    },
    {
        path: '/virtual-wallet',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/VirtualWallet.vue'),
        meta: { title: '我的电子钱包' }
    },
    {
        path: '/virtual-wallet-info',
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/mine/VirtualWalletInfo.vue'),
        meta: { title: '电子钱包' }
    },
];

export default mineRoute;