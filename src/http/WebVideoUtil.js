let webVideoList = {}
let webVideo = {}

const beforeLoginCheck = (error) => {
  if(WebVideoCtrl === undefined){
    error("no js");
    return false
  }
  if (-1 === WebVideoCtrl.I_CheckPluginInstall()) {
    error("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
    return false
  }
  // 初始化插件参数及插入插件
  WebVideoCtrl.I_InitPlugin(500, 300)
}

const WebVideoLogin = ({szIP, iPort, szUserName, szPassword, success, error}) => {
  if (!beforeLoginCheck(error)) {
    return
  }
  if (WebVideo === null) {
    error('webVideo is null')
    return
  }
  webVideo = WebVideoCtrl;
  if (webVideoList[`${szIP}:${iPort}`] === undefined) {
    WebVideoLogin({szIP, iPort, szUserName, szPassword, success, error})
  }
  webVideo.I_Login(szIP, 1, iPort, szUserName, szPassword, {
    success: success(),
    error: error()
  })
  return webVideo
}

const setWebVideo = ({szIP, iPort, szUserName, szPassword, success, error, divId}) => {
  if (webVideoList[`${szIP}:${iPort}`] === null) {
    WebVideoLogin({szIP, iPort, szUserName, szPassword, success, error})
  }
}

export default setWebVideo
