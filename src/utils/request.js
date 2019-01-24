import fetch from 'dva/fetch';
import { notification } from 'antd';
import hash from 'hash.js';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { generateSignRequest, generateToken } from 'f1-passport';
import { getSession } from './authority';

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

const regexSt = new RegExp('^https://[a-zA-Z0-9.-]*/');

async function signAndRequest(session, url, options) {
  let host = url.match(regexSt)[0];
  host = host.substring(0, host.length - 1);

  const pathAndQuery = url.replace(regexSt, '/');
  const signData = generateSignRequest(options.method.toLowerCase(), pathAndQuery);
  const token = await generateToken(session.key, session.secret, signData.sign);
  const finalUrl = `${host}${signData.uri}`;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  const newOptions = {
    ...options,
    method: options.method.toLowerCase(),
    headers,
  };
  return fetch(finalUrl, newOptions);
}

export function handleRequestError(e) {
  const status = e.name;
  if (status === 'TypeError') {
    const error = new Error('服务不可用');
    error.name = '服务不可用，服务器暂时过载或正在维护。';
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

  let { message } = e.response;
  let errMessage = formatMessage({ id: `app.request.error-code.${e.response.data.code}` });

  if (errMessage.match('app.request.error-code')) {
    errMessage = e.response.data.hint;
  }

  if (errMessage) {
    message = errMessage;
  }

  notification.error({
    message,
  });
}

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
  };

  const newOptions = { ...defaultOptions, ...options };

  newOptions.headers = {
    ...newOptions.headers,
  };

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

  let fetchRequest = null;
  // add token
  const session = await getSession();
  if (session) {
    fetchRequest = signAndRequest(session, urlCopy, newOptions);
  } else {
    fetchRequest = fetch(urlCopy, newOptions);
  }

  return fetchRequest
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
      handleRequestError(e);
    });
}
