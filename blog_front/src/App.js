import React from 'react'

import NewBlog from './components/NewBlog.js'


// import ballons from './images/two-balloon-icons-68911.png'
// import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
// import Show from './components/Show.js'
// import UpdateForm from './components/UpdateForm.js'
let baseURL = ''

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
        blogs: []
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
      this.setState({
        blogs: data
      });
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
      <table>
      <NewBlog handleAddBlog={this.handleAddBlog} baseURL={baseURL}/>
        <tbody>
          { this.state.blogs.map(blogs => {
              return (
                <tr  key={blogs._id}>
                  <td id={blogs._id}> {blogs.title }</td>
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
