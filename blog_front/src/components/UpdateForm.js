import React from 'react'

class UpdateForm extends React.Component {
  render () {
    return (
      <div className="modal edit">
        <form>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
            />
            <label htmlFor="entry">Entry</label>
            <input
              type="text"
              id="entry"
            />
            <input type="submit" value="Update Blog" className="button-primary" />
            <button className="button-red"> Don't Update </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateForm
