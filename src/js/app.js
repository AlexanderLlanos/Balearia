import scripts from './scripts'

const callback = mutations => {
  mutations.forEach( mutation => {
    scripts()
  })
}

const mutationObserver = () => {
  const target = document.getElementById('root')
  const observer = new MutationObserver(callback)
  const config = { childList: true, subtree: false }
  observer.observe(target, config)
}

const init = () => {
  scripts()
  mutationObserver()
}

document.addEventListener('DOMContentLoaded', init, false)
