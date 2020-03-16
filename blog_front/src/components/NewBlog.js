import React from 'react'

class NewBlog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      entry: ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({[event.currentTarget.id]: event.currentTarget.value})
  }
  async handleSubmit (event) {
    event.preventDefault()
    try{
      let response = await fetch(this.props.baseURL + '/blogs', {
          method: 'POST',
          body: JSON.stringify({title: this.state.title}, {entry: this.state.entry}),
          headers: {
              'Content-Type': 'application/json'
            }
          })
          let data = await response.json()
          this.props.handleAddBlog(data)
          this.setState({
            title: '',
            entry: ''
          })
        }catch(e){
          console.e({'Error': e})
        }
      }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title"></label>
        <input type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} placeholder="add your title"/>
        <label htmlFor="entry"></label>
        <input type="text" id="entry" name="entry" onChange={this.handleChange} value={this.state.entry} placeholder="add your blog"/>
        <input type="submit" value="Add Blog"/>
      </form>
    )
  }
}

export default NewBlog
