import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import NotesDetails from './components/NotesDetails';
import AddNote from './components/AddNote';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/notes/:id' element={<NotesDetails/>}/>
          <Route path='/notes/add/' element={<AddNote/>}/>
          <Route path='/notes/add/:id' element={<AddNote/>}/>
        </Routes>
      </BrowserRouter>
      {/* <LandingPage/> */}
    </div>
  );
}

export default App;
