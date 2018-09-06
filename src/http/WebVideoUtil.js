import { getWebVideo, setWebVideo } from './webVideoList'

const beforeLoginCheck = (error) => {
  if(WebVideoCtrl === undefined){
    error("no js");
    return false
  }
  if (-1 === WebVideoCtrl.I_CheckPluginInstall()) {
    error("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
    return false
  }
  return true
}
const winHandel = function (xml) {
  console.info(xml)
}
const init = function (webVideo, {divId}) {
  document.getElementById(divId).innerHTML = ''
  webVideo.I_InitPlugin('100%', '100%', {
    cbSelWnd: winHandel,
    iWndowType: 4
  })
  let res = webVideo.I_InsertOBJECTPlugin(divId)
  console.info('init---' + res)
  return res === 0
}
const login = function (webVideo, { szIP, iPort, szUserName, szPassword, success, resolve, reject }) {
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
      success(xmlDoc)
      resolve()
    },
    error: function () {
      reject('获取通道失败')
    }
  })
}
const play = function (webVideo, {szIP, success, resolve, error, reject}) {
  var oWndInfo = webVideo.I_GetWindowStatus(0)
  if (oWndInfo != null){// 已经在播放了，先停止
    webVideo.I_Stop()
  }
  var iRet = webVideo.I_StartRealPlay(szIP, {
    iStreamType: 1,
    iChannelID: 1,
    bZeroChannel: false
  })
  console.info('end--play--' + iRet)
  if (iRet === 0) {
    success('开始预览成功！')
  } else {
    error('开始预览失败！')
  }
}
const stop = function (webVideo) {
  webVideo.I_Stop()
}

const getWebVideoHandel = ({szIP, iPort, szUserName, szPassword, success, error, divId}) => {
  if (!beforeLoginCheck(error)) {
    return
  }
  let webVideo = null
  webVideo = WebVideoCtrl
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
