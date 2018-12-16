import React from 'react'
import ReactDOM from 'react-dom'
import Styles from './index.module.scss'

console.log(Styles)

ReactDOM.render(<h1 className={Styles.Hello}>Hello world</h1>, document.getElementById('root'))
