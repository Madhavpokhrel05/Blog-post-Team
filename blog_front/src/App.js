import React from 'react'

import './css/style.css'
import NewBlog from './components/NewBlog.js'
import ShowBlog from './components/ShowBlog.js'
import UpdateBlog from './components/UpdateBlog.js'

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'pulling from where is our backend url is example: http://'
}

console.log('current base URL:', baseURL)

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        blogs: [],
        blog: null
      }
      this.getBlogs = this.getBlogs.bind(this)
      this.handleAddBlog = this.handleAddBlog.bind(this)
      this.deleteBlog = this.deleteBlog.bind(this)
      this.toggleComplete = this.toggleComplete.bind(this)
      this.getBlog = this.getBlog.bind(this)
    }
    componentDidMount() {
      this.getBlogs()
    }

    async getBlogs() {
      try {
        let response = await fetch(`${baseURL}/blogs`);
        let data = await response.json();
        this.setState({blogs: data});
    } catch (e) {
      console.error(e);
      }
    }
    handleAddBlog(blog) {
      const copyBlogs = [blog, ...this.state.blogs]
      this.setState({
        blogs: copyBlogs,
        title: '',
        entry: ''
      })
    }
    handleSubmit (event) {
      event.preventDefault()
      fetch(baseURL + '/blogs', {
        method: 'POST',
        body: JSON.stringify({title: this.state.title}, {entry: this.state.entry}),
        headers: {
          'Content-Type': 'application/json'
        }
      }) .then (res => res.json())
         .then (resJson => {
           this.props.handleAddBlog(resJson)
           this.setState({
             title: '',
             entry: ''
           })
         }) .catch (error => console.error({'Error': error}))
      }
    async deleteBlog(id) {
      console.log(`I made a delete request to here: ${baseURL}/blogs/${id}`)
      try {
        let response = await fetch(baseURL + '/blogs/' +  id, {
          method: 'DELETE'
        })
        let data = await response.json()
        const foundBlog = this.state.blogs.findIndex(blog => blog._id === id)
        const copyBlogs = [...this.state.blogs]
        copyBlogs.splice(foundBlog, 1)
        this.setState({blogs: copyBlogs})
      } catch(e){
        console.error(e)
      }
    }
    async toggleComplete (blog){
      console.log(blog)
      try{
        let response = await fetch(baseURL + '/blogs/' + blog._id, {
          method: 'PUT',
          body: JSON.stringify({complete: !blog.complete}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let updatedBlog = await response.json()
        const foundBlog = this.state.blogs.findIndex(foundItem => foundItem._id === blog._id)
        const copyBlogs = [...this.state.blogs]
        copyBlogs[foundBlog].complete = updatedBlog.complete
        console.log(updatedBlog)
        this.setState({blogs: copyBlogs})
      } catch(e) {
        console.error(e)
      }
    }
    getBlog(blog) {
      this.setState({blog: blog})
      console.log(blog)
    }

    render () {
      return (
        <div className='container'>
          <h1>Blog Contents</h1>
          <NewBlog handleAddBlog={this.handleAddBlog} baseURL={baseURL}/>
          <table>
            <tbody>
              {this.state.blogs.map(blog => {
                return (
                  <tr key={blog._id} onMouseOver={() => this.getBlog(blog)}>
                    <td onDoubleClick={() => this.toggleComplete(blog)}
                      className={blog.complete
                      ? 'complete'
                      : null}>
                      {blog.title}
                    </td>
                    <td>{blog.likes}</td>
                   <td onClick={() => {this.deleteBlog(blog._id)}}>X</td>
                  </tr>
                )
              })
             }
        </tbody>
      </table>
      {this.state.blog
        ? <ShowBlog blog={this.state.blog}/>
        : null}
     </div>
   )
 }
}

export default App
