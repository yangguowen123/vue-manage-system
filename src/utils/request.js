import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // baseURL: 'http://hvzttbl.cn',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if (process.env.NODE_ENV === 'development') {
            config.url = `/api${config.url}`
        }
        console.log('config', config);
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            console.log('response', response);
            if (response.data.code == 999) {
                layer.open({
                    title : '提示',
                    icon : '7',
                    closeBtn : 0,
                    btn : [],
                    content : '系统检测到你已离线,请重新登录!',
                    time : 2000,
                    end : function() {
                        window.location.href = '/login';
                    }
                });
            } else if (response.data.code != 200) {
                response.ok = false;
                layer.alert(response.data.msg, {
                    title : '提示',
                    icon : 7,
                    time : 3000
                });
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
