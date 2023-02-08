import logo from './logo.svg';
import './App.css';

function App() {
  // @ts-ignore
  const preloadPath = window.electron.getPreloadPath();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {JSON.stringify({preloadPath})}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;