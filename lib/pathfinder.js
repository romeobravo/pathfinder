'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var event = 'change';

function sameOrigin(href) {
  var origin = location.protocol + '//' + location.hostname;
  if (location.port) origin += ':' + location.port;
  return href && 0 === href.indexOf(origin);
}

var Pathfinder = (function () {
  function Pathfinder(settings) {
    _classCallCheck(this, Pathfinder);

    this.listeners = {};
    this.event = settings.event || event;
    this.action = settings.action;
    this.popState();
    this.hook();
  }

  _createClass(Pathfinder, [{
    key: 'on',
    value: function on(event, callback) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(callback);
    }
  }, {
    key: 'emit',
    value: function emit(event, payload) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].forEach(function (cb) {
        cb(payload);
      });
    }
  }, {
    key: 'hook',
    value: function hook() {
      var _this = this;

      window.addEventListener('click', function (e) {
        _this.onClick(e);
      });
      window.addEventListener('popstate', function (e) {
        _this.popState();
      });
    }
  }, {
    key: 'changePath',
    value: function changePath(url) {
      if (this.action) this.action(url);else this.emit(this.event, url);
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (e.defaultPrevented) return;

      var el = e.target;
      while (el && el.nodeName != 'A') {
        el = el.parentNode;
      }
      if (!el || el.nodeName != 'A') return;
      if (el.getAttribute('download') || el.getAttribute('rel') === 'external') return;
      if (el.target) return;
      if (!sameOrigin(el.href)) return;

      e.preventDefault();
      this.pushState(el.pathname);
    }
  }, {
    key: 'pushState',
    value: function pushState(url) {
      history.pushState({}, url, url);
      this.changePath(url);
    }
  }, {
    key: 'popState',
    value: function popState() {
      this.changePath(window.location.pathname);
    }
  }]);

  return Pathfinder;
})();

exports.default = Pathfinder;