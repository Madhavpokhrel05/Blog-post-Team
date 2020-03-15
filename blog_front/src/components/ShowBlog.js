import React from 'react'

class ShowBlog extends React.Component {
  render () {
    return (
      <>
        <div className="details">
         <h3>Blog Title: {this.props.blog.title}</h3>

         <h4></h4>
         <p><span>Entry:</span> {this.props.blog.entry} </p>
       </div>
      </>
    )
  }
 }
export default ShowBlog
