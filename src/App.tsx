import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'

function App() {
  return (
    <div className="Pomodoro">
      <Countdown time={0} />
      <ControlButtons />
    </div>
  );
}

export default App;
