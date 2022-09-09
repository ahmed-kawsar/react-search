import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'

const App = () => {
  const API_URL = 'https://jsonplaceholder.typicode.com/posts'
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.body.toLowerCase().includes(search)
    )
    setSearchResults(filteredResults)
  }, [search, posts])

  return (
    <div className='App'>
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </form>
      <main className='posts'>
        {searchResults.slice(0, 25).map((post) => (
          <article key={post.id} className='post'>
            <div className='title'>
              <h3>{post.title}</h3>
            </div>
            <div className='desc'>
              <p>{post.body}</p>
              <p className='userId'>User Id: {post.userId}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
export default App
