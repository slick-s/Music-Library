import { useEffect, useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
        console.log(resData);
      }
      fetchData()
    }
    
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
/*     const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(API_URL + search)
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage('Not Found')
      }
      console.log(resData);
    } */

  }

  return (
    <div className='App'>
{/*       <SearchContext.Provider value={
        {
          term: searchInput,
          handleSearch: handleSearch
        }
      }>
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery data={data} />
      </DataContext.Provider> */}

      {message}
      <Router>
            <Routes>
                <Route path="/" element={
                    <Fragment>
                        <SearchBar handleSearch = {handleSearch}/>
                        <Gallery data={data} />
                    </Fragment>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
      <SearchBar handleSearch={handleSearch} />
      {message}
      <Gallery data={data} />
      <AlbumView />
      <ArtistView />
    </div>
  )
}

export default App
