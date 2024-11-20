import logo from './logo.svg';
import './App.css';
import Page_Main from './components/PAGE_Main';
import { useEffect } from 'react';
import './components/STYLE/shade_container.css';
import './components/STYLE/fade.css';
function App() {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="App">
      <Page_Main></Page_Main>
    </div>
  );


}


export default App;
