import * as React from 'react'
import * as ReactDOM from 'react-dom'

import TouchEmulator from 'hammer-touchemulator'

window.TouchEmulator = TouchEmulator

import {Routes} from './components/Routes'

function App() {
  return <Routes />
}

ReactDOM.render(<App />, document.querySelector('#app'))
