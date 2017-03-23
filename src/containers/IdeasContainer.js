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
        {this.props.ideas.asMutable().sort((a, b) => {
          if(a.id > b.id) return -1
          else if(a.id < b.id) return 1
          else return 0
        }).map((idea, key) => {
          return (
            <Card key={key}>
              <Card.Content>
                {idea.text}
              </Card.Content>
              <Card.Description>
                {new Date(idea.id).toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'})}
              </Card.Description>
              <Button compact onClick={this.props.removeIdea.bind(this, idea.id)}>
                Remove
              </Button>
            </Card>
          )
        })}
      </div>
    )
  }

  onSubmit = (e) => {
    this.props.addIdea(this.refs.input.value, Date.now())
    e.stopPropagation()
    e.preventDefault()
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
    addIdea: (text, id) => dispatch(IdeasActions.addIdeaAttempt(text, id)),
    removeIdea: (id) => dispatch(IdeasActions.removeIdeaAttempt(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasContainer)
