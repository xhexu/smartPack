const webVideoList = new Map()

export function getWebVideo (key) {
  return webVideoList.get(key)
}

export function setWebVideo (key, value) {
  webVideoList.set(key, value)
}
