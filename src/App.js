import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import NotesDetails from './components/NotesDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/note1' element={<NotesDetails/>}/>
          <Route path='/notes/:id' element={<NotesDetails/>}/>
        </Routes>
      </BrowserRouter>
      {/* <LandingPage/> */}
    </div>
  );
}

export default App;
