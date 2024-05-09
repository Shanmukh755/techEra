import Home from './components/Home'
import CourseItem from './components/CourseItem'
import Header from './components/Header'
import NotFound from './components/NotFound'
import {Switch, Route} from 'react-router-dom'
import './App.css'

// Replace your code here
const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseItem} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App
