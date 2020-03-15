import React from 'react'

class NewBlog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.currentTarget.id]:
    event.currentTarget.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      let response = await fetch(this.props.baseURL + '/blogs', {
        method: 'POST',
        body: JSON.stringify({title: this.state.title}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      this.props.handleAddBlog(data)
      this.setState({
        title: ''
      })
    } catch (e) {
      console.error({
        'Error': e
      })
    }

  }
  render () {
    // console.log("new blog");

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title"></label>
        <input type="text" id="title" title="title" onChange={this.handleChange} value={this.state.title} placeholder="add a blog"/>
        <input type="submit" value="Blog content"/>
      </form>

    )
  }
}

export default NewBlog
