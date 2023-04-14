import './App.css';
import "animate.css";
import Tictactoe from './components/Tictactoe';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Tic Tac Toe
      </header>
      <main className='App-Main'>
        <Tictactoe></Tictactoe>
      </main>
    </div>
  );
}

export default App;
