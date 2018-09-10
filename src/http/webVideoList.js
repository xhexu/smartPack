const webVideoList = new Map()

export function getWebVideo (key) {
  return webVideoList.get(key)
}

export function setWebVideo (key, value) {
  webVideoList.set(key, value)
}

const videoConfig = [
  {
    title: 'AA-video',
    ip: '117.186.66.54',
    port: '81',
    name: 'admin',
    password: 'aa123456'
  },
  {
    title: 'BB-video',
    ip: '117.186.66.54',
    port: '82',
    name: 'admin',
    password: 'aa123456'
  },
  {
    title: 'CC-video',
    ip: '117.186.66.54',
    port: '83',
    name: 'admin',
    password: 'aa123456'
  },
  {
    title: 'DD-video',
    ip: '117.186.66.54',
    port: '84',
    name: 'admin',
    password: 'aa123456'
  },
  {
    title: 'EE-video',
    ip: '117.186.66.54',
    port: '85',
    name: 'admin',
    password: 'aa123456'
  },
  {
    title: 'FF-video',
    ip: '117.186.66.54',
    port: '86',
    name: 'admin',
    password: 'aa123456'
  },
  {
    title: 'GG-video',
    ip: '117.186.66.54',
    port: '87',
    name: 'admin',
    password: 'aa123456'
  }/*,
  {
    title: 'HH-video',
    ip: '61.134.28.101',
    port: '90',
    name: 'admin',
    password: 'a1234567'
  }*/
]

export default videoConfig
