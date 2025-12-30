
import { useEffect } from 'react';
import PhoneFrame from './a_basic_frame/PhoneFrame';
import CalendarPage from './View/CalendarPage';
import { EventProvider } from './contexts/EventContext';
import { useSettingsStore } from './stores/useSettingsStore';

function App() {
  useEffect(() => {
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在自动跟随系统模式下才更新主题
      const currentAutoFollow = useSettingsStore.getState().autoFollowSystem;
      if (currentAutoFollow) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        useSettingsStore.setState({ isDarkMode: e.matches });
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <EventProvider>
      <PhoneFrame>
        <CalendarPage />
      </PhoneFrame>
    </EventProvider>
  );
}

export default App;
