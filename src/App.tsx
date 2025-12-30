
import PhoneFrame from './a_basic_frame/PhoneFrame';
import CalendarPage from './View/CalendarPage';
import { EventProvider } from './contexts/EventContext';

function App() {
  return (
    <EventProvider>
      <PhoneFrame>
        <CalendarPage />
      </PhoneFrame>
    </EventProvider>
  );
}

export default App;
