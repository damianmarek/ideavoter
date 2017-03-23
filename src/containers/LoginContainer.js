import React from 'react'
import { connect } from 'react-redux'
import LoginActions from '../redux/loginRedux'
import { Menu, Button, Header } from 'semantic-ui-react'

class LoginContainer extends React.Component {
  render () {
    return (
      <Menu stackable>
        <Menu.Item position='right'>
          <Header content={this.manageHeaderContent()}/>
        </Menu.Item>
        <Menu.Item position='right' >
          <Button onClick={() => {this.handleLogin()}}
            content={this.props.loginState.logged ? 'Logout' : 'Login'} />
        </Menu.Item>
      </Menu>
    )
  }

  manageHeaderContent = () => {
    return this.props.loginState.logged ? `Logged as ${this.props.loginState.name}`:`Login to add and remove ideas `
  }

  handleLogin = () => {
    this.props.loginState.logged ? this.props.logout() : this.props.login()
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: state.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(LoginActions.loginAttempt()),
    logout: () => dispatch(LoginActions.logoutAttempt()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
