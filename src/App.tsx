import { FC } from 'react'
import './App.css'
import Countdown from './components/Countdown'
import ControlButtons from './components/ControlButtons'
import CompletedPomodoros from './components/CompletedPomodoros'
import Heading from './components/Heading'
import { UserSettingsProvider } from './services/useTimesContext'

const App: FC = () => (
  <div id='App'>
    <UserSettingsProvider>
      <Heading />
      <Countdown />
      <ControlButtons />
      <CompletedPomodoros />
    </UserSettingsProvider>
  </div>
)

export default App;
