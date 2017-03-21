import React from 'react'
import { connect } from 'react-redux'
import IdeasActions from '../redux/ideasRedux'
import './styles/IdeasContainer.css'

class IdeasContainer extends React.Component {
  render () {
    return (
      <div className='container'>
        <input ref='input' />
        <button onClick={() => {this.onButtonClick()}}>
          Add
        </button>
        {this.props.ideas.map((idea, key) => {
          return (
            <text key={key}>
              {idea}
            </text>
          )
        })}
      </div>
    )
  }

  onButtonClick = () => {
    this.props.addIdea(this.refs.input.value)
  }

}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIdea: (text) => dispatch(IdeasActions.addIdea(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasContainer)
