import React from 'react'
import ImageUpload from './components/uploadPost'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './components/feed'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/create-post' element={<ImageUpload />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App;