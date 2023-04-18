import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './AppContext'
import { apiGateway } from './config/apiGateway'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home';
import { AddData } from './components/AddData';
import { EditData } from './components/EditData';

function App() {
  const [tableData, setTableData] = useState([])

  const getTableData = async () => {
    const result = await apiGateway.get('/tbrelcod?_sort=relcod&_lowerKeys=true')

    setTableData(result.data.rows)     
  }
  
  useEffect(()=>{
    getTableData()
  }, [])
  
  return (
    <div className='App'>
      <AppContext.Provider value={[tableData, setTableData]}>        
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/add' element={ <AddData /> } />
          <Route path='/:id' element={ <EditData /> } />
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
  )
}

export default App;
