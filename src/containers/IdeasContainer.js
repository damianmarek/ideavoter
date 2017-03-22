import React from 'react'
import { connect } from 'react-redux'
import IdeasActions from '../redux/ideasRedux'
import LoginActions from '../redux/loginRedux'
import './styles/IdeasContainer.css'

class IdeasContainer extends React.Component {
  render () {
    return (
      <div className='container'>
        {this.getLoginState()}
        <button onClick={() => {this.handleLogin()}}>
          Login
        </button>
        <button onClick={() => {this.handleLogout()}}>
          Logout
        </button>
        <form onSubmit={(e) => {this.onSubmit(e)}}>
          <input ref='input' />
          <button type='submit'>
            Add
          </button>
        </form>
        {this.props.ideas.map((idea, key) => {
          return (
            <div key={key}>
              <text>
                {idea.text}
              </text>
              <button type='button' onClick={this.props.removeIdea.bind(this, idea.id)}>
                Remove
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  componentDidMount = () => {
    this.props.loadIdeas()
  }

  onSubmit = (e) => {
    this.props.addIdea(this.refs.input.value, Date.now())
    e.preventDefault()
  }

  handleLogin = () => {
    this.props.login()
  }

  handleLogout = () => {
    this.props.logout()
  }

  getLoginState = () => {
    if(this.props.loginState.logged) {
      return (
        <text>
          Logged as {this.props.loginState.name}
        </text>
      )
    } else {
      return (
        <text>
          Login to add and remove ideas
        </text>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas.list,
    loginState: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIdea: (text, id) => dispatch(IdeasActions.addIdeaAttempt(text, id)),
    removeIdea: (id) => dispatch(IdeasActions.removeIdeaAttempt(id)),
    loadIdeas: () => dispatch(IdeasActions.loadIdeasAttempt()),
    login: () => dispatch(LoginActions.loginAttempt()),
    logout: () => dispatch(LoginActions.logoutAttempt()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasContainer)
