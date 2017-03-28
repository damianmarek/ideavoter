import React from 'react'
import { connect } from 'react-redux'
import IdeasActions from '../redux/ideasRedux'
import './styles/IdeasContainer.css'
import { Form, Button, Card } from 'semantic-ui-react'

class IdeasContainer extends React.Component {
  render () {
    return (
      <div className='container'>
        <Form onSubmit={(e) => {this.onSubmit(e)}}>
          <Form.Field disabled={!this.props.loginState.logged}>
            <label>Create idea</label>
            <input ref='input' placeholder='Content'/>
          </Form.Field>
          <Button type='submit' disabled={!this.props.loginState.logged}>
            Add
          </Button>
        </Form>
        {this.renderIdeas()}
      </div>
    )
  }

  renderIdeas = () => {
    return Object.keys(this.props.ideas)
    .map((obj, key) => {
      return {
        ...this.props.ideas[obj],
        _key: obj
      }
    }).sort((a, b) => {
      if(a.timestamp > b.timestamp) return -1
      if(a.timestamp < b.timestamp) return 1
      else return 0
    })
    .map((idea, key) => {
      return (
        <Card key={key}>
          <Card.Content>
           {idea.text}
          </Card.Content>
          <Card.Description>
            {new Date(idea.timestamp).toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'})}
          </Card.Description>
          <Card.Meta>
            {this.props.ideas[idea._key].likes}
          </Card.Meta>
          <Button compact onClick={this.props.like.bind(this, idea._key)}>
            Like
          </Button>
          <Button compact onClick={this.props.removeIdea.bind(this, idea._key)}>
            Remove
          </Button>
        </Card>
      )
    })
  }

  onSubmit = (e) => {
    this.props.addIdea(this.refs.input.value, Date.now())
    e.stopPropagation()
    e.preventDefault()
  }

  componentDidMount = () => {
    // Load likes on component mount
    this.props.loadLikes()
  }

}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas.list,
    loginState: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIdea: (text, timestamp) => dispatch(IdeasActions.addIdeaAttempt(text, timestamp)),
    removeIdea: (key) => dispatch(IdeasActions.removeIdeaAttempt(key)),
    like: (key) => dispatch(IdeasActions.likeIdeaAttempt(key)),
    loadLikes: () => dispatch(IdeasActions.loadLikes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasContainer)
