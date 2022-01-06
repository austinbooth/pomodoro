import './App.css'
import Countdown from './components/Countdown';

function App() {
  return (
    <div className="Pomodoro">
      <Countdown time={0} />
    </div>
  );
}

export default App;
