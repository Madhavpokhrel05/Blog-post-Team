import React from 'react'

class ShowBlog extends React.Component {
  render () {
    return (
      <>
        <div className="details">
         <h3>Blog Details:</h3>
         <hr/>
         <h4> { this.props.blog.title } Details </h4>
         <h6><span>content:</span>   { this.props.blog.content ? 'There is a content' : 'There is not any content'} </h6>
         <p><span>entry:</span> { this.props.blog.entry } </p>
       </div>
      </>
    )
  }
 }
export default ShowBlog
