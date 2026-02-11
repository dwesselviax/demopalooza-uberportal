import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatBot from './ChatBot';

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />
        <main style={{ flex: 1, maxWidth: '80rem', width: '100%', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <Outlet />
        </main>
        <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.875rem', color: '#9CA3AF' }}>
          Powered by viax
        </footer>
      </div>
      <ChatBot />
    </div>
  );
}
