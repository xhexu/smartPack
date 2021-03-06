window.downloadFile = function (sUrl) {

  if (/(iP)/g.test(navigator.userAgent)) {
    alert('Your device does not support files downloading. Please try again in desktop browser.');
    return false;
  }

  if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
    var link = document.createElement('a');
    link.href = sUrl;

    if (link.download !== undefined) {
      var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
      link.download = fileName;
    }

    if (document.createEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  // Force file download (whether supported by server).
  if (sUrl.indexOf('?') === -1) {
    sUrl += '?download';
  }

  window.open(sUrl, '_self');
  return true;
}

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
const beforeLoginCheck = (error, vm) => {
  if (WebVideoCtrl === undefined) {
    error("no js")
    return false
  }
  if (WebVideoCtrl.I_CheckPluginInstall() === -1) {
    error('您还未安装过插件，双击开发包目录里的WebComponents.exe安装！');
    vm.$confirm('缺少插件(或浏览器不支持插件), 是否下载插件?', '提示', {
      confirmButtonText: '下载',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      window.downloadFile('/static/WebComponents.exe')
    }).catch(() => {
      return false
    });
    return false
  }
  return true
}
const winHandel = function (xml) {
  console.info(xml)
}
const init = function (webVideo, {divId}) {
  // document.getElementById(divId).innerHTML = ''
  webVideo.I_InitPlugin('100%', '100%', {
    cbSelWnd: winHandel,
    iWndowType: 4
  })
  let res = webVideo.I_InsertOBJECTPlugin(divId)
  webVideo.passageway = []
  return res === 0
}
const login = function (webVideo, { szIP, iPort, szUserName, szPassword, success, resolve, reject }) {
  webVideo.I_Logout(szIP)
  var iRet = webVideo.I_Login(szIP, 1, iPort, szUserName, szPassword, {
    success: function (xmlDoc) {
      success('login success', xmlDoc)
      resolve()
    },
    error: function () {
      reject('登录失败')
    }
  })
  if (iRet === -1) {
    resolve()
  }
}
const getPassWay = function (webVideo, { szIP, iPort, szUserName, szPassword, success, resolve, reject }) {
  webVideo.I_GetAnalogChannelInfo(szIP, {
    async: false,
    success: function (xmlDoc) {
      success('模拟通道')
      success(xmlDoc)
      resolve()
    },
    error: function () {
      // reject('获取模拟通道失败')
      console.info('获取模拟通道失败')
    }
  })
  webVideo.I_GetDigitalChannelInfo(szIP, {
    async: false,
    success: function (xmlDoc) {
      success('数字通道')
      success(xmlDoc)

      var oChannels = $(xmlDoc).find('InputProxyChannelStatus')
      $.each(oChannels, function (i) {
        var id = parseInt($(this).find('id').eq(0).text(), 10)
        webVideo.passageway.push(id)
      })
      resolve()
    },
    error: function () {
      console.info('获取数字通道失败')
    }
  })
  webVideo.I_GetZeroChannelInfo(szIP, {
    async: false,
    success: function (xmlDoc) {
      success('零通道')
      success(xmlDoc)
      resolve()
    },
    error: function () {
      console.info('获取零通道失败')
    }
  })
}
const play = function (webVideo, {szIP, success, resolve, error, reject}) {

  webVideo.passageway.forEach((en, index) => {
    var oWndInfo = webVideo.I_GetWindowStatus(index)
    if (oWndInfo != null) {// 已经在播放了，先停止
      webVideo.I_Stop(index)
    }
    webVideo.I_StartRealPlay(szIP, {
      iStreamType: 2,
      iChannelID: en,
      bZeroChannel: false,
      iWndIndex: index
    })
  })
}

const getWebVideoHandel = ({szIP, iPort, szUserName, szPassword, success, error, divId, vm}) => {
  if (!beforeLoginCheck(error, vm)) {
    return
  }
  let webVideo = null
  webVideo = Object.assign({}, WebVideoCtrl)
  if (!init(webVideo, {divId})) {
    return
  }
  new Promise(function (resolve, reject) {
    login(webVideo, {szIP, iPort, szUserName, szPassword, success, error, divId, resolve, reject})
  }).then(() =>
    new Promise(
      function (resolve, reject) {
        getPassWay(webVideo, {szIP, iPort, szUserName, szPassword, success, error, divId, resolve, reject})
      }
    )
  ).then(() =>
    setTimeout(() =>
      play(webVideo, {szIP, iPort, szUserName, szPassword, success, error, divId})
      , 20)
  ).catch((e) =>
    error(e)
  )
  return webVideo
}

export default getWebVideoHandel
