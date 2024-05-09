import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class EachCourse extends Component {
  render() {
    const {eachCourseData} = this.props
    const {id, name, logoUrl} = eachCourseData
    return (
      <Link to={`/courses/${id}`} className="nav-link">
        <li className="each-course-item">
          <img src={logoUrl} className="course-logo" alt={name} />
          <p className="course-name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default EachCourse
