
import Home from './Home';
import Addcart from './Addcart';
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout><Home /></Layout>} />
            <Route path="/Addcart" element={ <Layout><Addcart /></Layout>} />
          </Routes>
      </BrowserRouter>   
        </>
  )
}

export default App
