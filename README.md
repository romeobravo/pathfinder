# Pathfinder
#### JS Event Emitter for browser navigation
Listens to window.click and window.popstate events for url navigation.
Pathfinder will emit an event or callback for all internal navigation and prevents default behaviour for clicking a link.



```bash
npm install https://github.com/romeobravo/pathfinder
```

## Examples

```js
import pathfinder from 'pathfinder'

pathfinder.init({
  action: function(url) {
    alert('navigation event')
  }
})
```

babel ./src/pathfinder.js --out-file ./lib/pathfinder.js --presets es2015
