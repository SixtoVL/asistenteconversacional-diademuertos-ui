import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeView } from '../modules/home/views/HomeView';
import { ChatView } from '../modules/chat/views/ChatView';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/chat" element={<ChatView />} />
      </Routes>
    </BrowserRouter>
  );
}
