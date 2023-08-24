import request from '/util/request'

App({
  onLaunch(options) {
    console.log('当前机型信息：', dd.getSystemInfoSync())
    // 第一次打开
    // 存储当前登录人的信息
    dd.getAuthCode({
      corpId: 'ding2d05a9c4288b9dfd35c2f4657eb6378f',
      success: (res) => {
        const { authCode } = res;
        request.get(`/kds-serve/dmsg/get_us`, {
          code: authCode
        })
        .then(res => {
          if (res.code === 200) {
            const { result } = res
            const currentId = result.split('_')[0]
            const currentName = result.split('_')[1]
            dd.setStorageSync({
              key: 'currentId',
              data: currentId,
            })
            dd.setStorageSync({
              key: 'currentName',
              data: currentName,
            })
          }
        })
      },
      fail: () => {},
      complete: () => {},
    });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
