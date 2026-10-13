import { ThemeProvider } from './context/ThemeContext';
import { ChatSettingsProvider } from './context/ChatSettingsContext';
import { AppRouter } from './routes/AppRouter';

export function App() {
  return (
    <ThemeProvider>
      <ChatSettingsProvider>
        <AppRouter />
      </ChatSettingsProvider>
    </ThemeProvider>
  );
}
