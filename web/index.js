import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Card } from 'reactstrap'

import './style.scss'

import Header from './components/Header'

// Import modules
import Employee from './modules/employees'

const Root = () => (
  <div className="app-container">
    <Header />
    <Router>
      <div className="container-fluid view-container" id="app-view-container">
        <Card className="jh-card">
          <Employee />
        </Card>
      </div>
    </Router>
  </div>
)

ReactDOM.render(<Root />, document.getElementById('root'))
