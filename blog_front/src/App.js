import React from 'react'

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
      }
      this.getBlogs = this.getBlogs.bind(this)
      this.handleAddBlog = this.handleAddBlog.bind(this)
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
        title: ''
      })
    }

    render () {
      return (
        <div className='container'>
          <h1>Blogs Contents</h1>
          <NewBlog handleAddBlog={this.handleAddBlog} baseURL={baseURL}/>
          <table>
            <tbody>
              {this.state.blogs.map(blog => {
                return (
                  <tr key={blog._id}>
                    <td> {blog.title}</td>
                  </tr>
                )
              })
             }
        </tbody>
      </table>
     </div>
   )
 }
}

export default App
