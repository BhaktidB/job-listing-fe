import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddJobPage from './Pages/AddJobPage/AddJobPage'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import ViewDetailsPage from './Pages/ViewDetailsPage/ViewDetailsPage'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/' element={<HomePage/>} />
      <Route path='/job-details/:id' element={<ViewDetailsPage/>} />
      <Route path='/job-post' element={<AddJobPage/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
