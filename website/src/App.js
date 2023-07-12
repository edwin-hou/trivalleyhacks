import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import About from './About';
import Article from './Article';
import { useParams } from 'react-router-dom'
import Upload from './upload';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/" element={<Home />}>
        </Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/upload" element={<Upload></Upload>}></Route>
        <Route path="/article" element={<Article></Article>}>
                </Route>
      </Routes>
      
    </BrowserRouter>

  );
}

export default App;
