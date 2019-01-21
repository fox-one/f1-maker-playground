import fetch from 'dva/fetch';
import { notification } from 'antd';
// import router from 'umi/router';
import hash from 'hash.js';
import { getLocale } from 'umi/locale';
import router from 'umi/router';
import { getToken } from './authority';

const codeMessageCN = {
  10700: '此手机号码已经注册',
  10701: '请先登录',
  10702: '登录失败',
  10703: '验证码发送失败',
  10704: '密码长度不符合',
  10705: '无访问权限',
  10707: '账号不可用',
  10708: '登录太频繁,请稍后再试',
  10712: '账号未激活',

  10722: '未找到该订单',
};

const codeMessageUS = {
  10700: 'phone number already registed',
  10701: 'login required',
  10702: 'login failed',
  10703: 'send validation code failed',
  10704: 'the length of password is invalid',
  10706: 'permission denied',
  10707: 'account is not enabled',
  10708: 'login too frequently',
  10712: 'account not activated yet',

  10722: 'transaction not found',
};

function getQueryString(params) {
  if (!params) {
    return '';
  }
  const esc = encodeURIComponent;
  return Object.keys(params).reduce((acc, cur) => {
    if (params[cur] !== null && params[cur] !== undefined) {
      return `${acc.indexOf('=') < 0 ? acc : `${acc}&`}${esc(cur)}=${esc(params[cur])}`;
    }
    return acc;
  }, '?');
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error();
  error.name = response.status;
  // error.response = response.json();
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function request(url, option) {
  const options = {
    expirys: false,
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
    headers: {
      'f1ex-admin-token': await getToken(),
    },
  };
  const newOptions = { ...defaultOptions, ...options };

  newOptions.headers = {
    ...newOptions.headers,
  };
  // add token
  const token = await getToken();
  if (token) {
    newOptions.headers['f1ex-admin-token'] = token;
  }

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  let urlCopy = url;
  if (['GET', 'DELETE'].indexOf(newOptions.method) > -1) {
    if ('params' in newOptions) {
      urlCopy = `${urlCopy}${getQueryString(newOptions.params)}`;
    }
  }

  return fetch(urlCopy, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const status = e.name;

      if (status === 'TypeError') {
        const error = new Error('服务不可用');
        error.name = '服务不可用，服务器暂时过载或维护。';
        notification.error({
          message: error.message,
          description: error.name,
        });
        throw error;
      }

      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }

      if (status === 404) {
        router.push('/exception/404');
      }

      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
      }

      // e.response.then(response => {
      //   const locale = getLocale();
      //   let message = response.error;
      //   if (!locale || locale === 'zh-CN') {
      //     message = codeMessageCN[response.status] ? codeMessageCN[response.status] : response.error;
      //   } else {
      //     message = codeMessageUS[response.status] ? codeMessageUS[response.status] : response.error;
      //   }
      //   notification.error({
      //     message,
      //   });
      // });
    });
}
