import React from 'react'
import { Switch, Route } from 'react-router-dom'

import List from './List'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={List} />
  </Switch>
)

export default Routes
