import { ThemeProvider } from './context/ThemeContext';
import { HomeView } from './modules/home/views/HomeView';

export function App() {
  return (
    <ThemeProvider>
      <HomeView />
    </ThemeProvider>
  );
}
