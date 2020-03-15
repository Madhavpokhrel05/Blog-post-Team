import React from 'react'

import NewBlog from './components/NewBlog.js'


// import ballons from './images/two-balloon-icons-68911.png'
// import pencil from './images/simpleiconDOTcom-pen-15-64x64.png'
import ShowBlog from './components/ShowBlog.js'
import UpdateForm from './components/UpdateForm.js'
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
        blogs: [],
        blog: null
      }
      this.getBlogs = this.getBlogs.bind(this)
      this.handleAddBlog = this.handleAddBlog.bind(this)
      this.deleteBlog = this.deleteBlog.bind(this)

      this.getBlog = this.getBlog.bind(this)
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
    async deleteBlog (id){
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

  getBlog(blog){
    this.setState({blog: blog})
    console.log(blog);
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
                <tr key={blogs._id} onMouseOver={()=> this.getBlog(blogs)}>
                  <td onDoubleClick={()=>this.toggleContent(blogs)}
                  className={blogs.content
                  ? 'content'
                  : null }>
                  {blogs.title} have it's {blogs.content ? 'have contend': 'do not have content'}
                  </td>
                  <td>onClick={()=>{this.deleteBlog(blogs._id)}}Delete</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      { this.state.blog
        ? <ShowBlog blog={this.state.blog}/>
        : null }
     </div>
   )
 }
}
export default App
