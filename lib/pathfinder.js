'use strict'

const event = 'change'

function sameOrigin(href) {
  let origin = location.protocol + '//' + location.hostname
  if (location.port) origin += ':' + location.port
  return (href && (0 === href.indexOf(origin)))
}

class Pathfinder {
  constructor(settings) {
    this.listeners = {}
    this.event = settings.event || event
    this.action = settings.action
    this.popState()
    this.hook()
  }

  on(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
  }

  emit(event, payload) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].forEach(cb => {
      cb(payload)
    })
  }

  hook() {
    window.addEventListener('click', e => {
      this.onClick(e)
    })
    window.addEventListener('popstate', e => {
      this.popState()
    })
  }

  changePath(url) {
    if (this.action)
      this.action(url)
    else
      this.emit(this.event, url)
  }

  onClick(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return
    if (e.defaultPrevented) return

    let el = e.target
    while(el && el.nodeName != 'A') {
      el = el.parentNode
    }
    if(!el || el.nodeName != 'A') return
    if(el.getAttribute('download') || el.getAttribute('rel') === 'external') return
    if(el.target) return
    if(!sameOrigin(el.href)) return

    e.preventDefault()
    this.pushState(el.pathname)
  }

  pushState(url) {
    history.pushState({}, url, url)
    this.changePath(url)
  }

  popState() {
    this.changePath(window.location.pathname)
  }
}

export default Pathfinder
