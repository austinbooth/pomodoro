import { FC } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import CompletedPomodoros from './components/CompletedPomodoros'
import Heading from './components/Heading'
import { Provider } from './services/useAppContext'

const App: FC = () => (
  <div id='App'>
    <Provider>
      <Heading />
      <Countdown />
      <ControlButtons />
      <CompletedPomodoros />
    </Provider>
  </div>
)

export default App;
