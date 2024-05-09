import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CousrseItem extends Component {
  state = {
    courseItem: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseItem()
  }

  getCourseItem = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseItem: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {courseItem} = this.state
    const {name, imageUrl, description} = courseItem
    return (
      <div className="course-item-container">
        <div className="course-card-container">
          <img src={imageUrl} className="card-img" alt={name} />
          <div className="card-data-container">
            <p className="card-name">{name}</p>
            <p className="card-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => {
    return (
      <div data-testid="loader" className="loader-container">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          className="failure-img"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-des">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry-btn">Retry</button>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default CousrseItem
