import React from 'react'
import { connect } from 'react-redux'
import IdeasActions from '../redux/ideasRedux'
import './styles/IdeasContainer.css'

class IdeasContainer extends React.Component {
  render () {
    return (
      <div className='container'>
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

}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIdea: (text, id) => dispatch(IdeasActions.addIdeaAttempt(text, id)),
    removeIdea: (id) => dispatch(IdeasActions.removeIdeaAttempt(id)),
    loadIdeas: () => dispatch(IdeasActions.loadIdeasAttempt()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasContainer)
