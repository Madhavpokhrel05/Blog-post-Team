import React from 'react'

class UpdateBlog extends React.Component {
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
            <textarea
              className="u-full-width"
              id="entry"
            >
            </textarea>
            <input type="submit" value="Update Blog" className="button-primary" />
            <button className="button-blue"> Don't Update </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateBlog
