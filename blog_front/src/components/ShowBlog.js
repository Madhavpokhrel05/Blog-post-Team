import React from 'react'

class ShowBlog extends React.Component {
  render () {
    return (
      <>
        <div className="details">
         <h3>Blog Title: {this.props.blog.title}</h3>
         <h4>Entry: {this.props.blog.entry}</h4>
         <h6><span>Likes:</span></h6>
       </div>
      </>
    )
  }
 }

export default ShowBlog
