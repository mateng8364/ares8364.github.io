# axios拦截器: refreshToken和接口的二次调用

  

当检测到令牌过期时，利用刷新令牌（refresh_token）从服务器获取新的访问令牌（Authorization），并更新客户端存储的令牌信息，保证用户能够继续无感知地使用应用，提升用户体验

````js
// 若acess_token过期，记录业务接口调用config，重刷token成功后二次调用业务接口
const originalRequest = response.config
if (data.code === 401 && !originalRequest._retry) {
  await refreshToken()
  promise = null
  originalRequest._retry = true
  try {
    const secondResponse = await service.request(originalRequest)
    return secondResponse
  } catch (secondError) {
    return Promise.reject(secondError)
  }
}
````

全局维护一个promise，多个业务接口调用时返回同一个promise，等待重刷token接口返回

````js
let promise
function refreshToken() {
  if (promise) {
    return promise
  } else {
    promise = new Promise((resolve) => {
      store.dispatch('user/refreshToken').then(
        () => {
          resolve()
        },
        () => {
          removeToken()
          location.reload()
        }
      )
    })
    return promise
  }
}
````

回到axios拦截器中，当响应头里出现`authorization`(和后端约定好的规则)时意味着需要更新过期的acess_token，更新cookie以及缓存里的token

````js
if (headers.authorization) {
  const token = getToken()
  const newToken = {
    Authorization: headers.authorization,
    refresh_token: token.refresh_token
  }
  setToken(newToken)
  store.dispatch('user/updateToken', newToken)
}
````

