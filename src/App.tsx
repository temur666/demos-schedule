
import PhoneFrame from './a_basic_frame/PhoneFrame';
import CalendarPage from './pages/CalendarPage';
import { EventProvider } from './contexts/EventContext';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <EventProvider>
        <PhoneFrame>
          <CalendarPage />
        </PhoneFrame>
      </EventProvider>
    </SettingsProvider>
  );
}

export default App;
