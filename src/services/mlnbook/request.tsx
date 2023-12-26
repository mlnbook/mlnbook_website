import request from 'umi-request';
import {Button, message, Result} from "antd";

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    if(url!='/v2api/auth/users/current/'){
        const headers = {
            Authorization: "Token " + localStorage.getItem("token")
        };
        return {
            url,
            options: {...options, headers, interceptors: true},
        };
    }
    return {
        url,
        options: {...options, interceptors: true},
    };

});

// 和上一个相同
request.interceptors.request.use(
    (url, options) => {
        return {
            url: `${url}`,
            options: { ...options, interceptors: true },
        };
    },
    { global: true }
);

// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
    const contentType = response.headers.get('Content-Type');
    return response;
});

// 提前对响应做异常处理
request.interceptors.response.use(async response => {
    const codeMaps = {
        // 200: '请求成功',
        // 201: '请求成功1',
        // 400: '参数错误',
        // 403: '您暂时没有权限，请联系管理员',
        500: '服务器发生错误，请稍后重试',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    };
    // if(response.status == '404'){
    //     history.push(`/${curStageApp()}/not_found`)
    // }
    // if(response.status == '403'){
    //     const data = await response.clone().json();
    //     if (data?.admin_user == undefined || data?.admin_user == null) {
    //         history.push({pathname: `/${curStageApp()}/unauthorized`, query: {url: response?.url}})
    //     }
    // }
    if(codeMaps[response.status]) {
        message.error(codeMaps[response.status])
    }
    return response;
});

// 克隆响应对象做解析处理
request.interceptors.response.use(async response => {
    const data = await response.clone().json();
    if (data && data.NOT_LOGIN) {
        location.href = '登录url';
    }
    return response;
});

export default request;
