import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/Button";
import Header from '../components/Header';
import axios from 'axios';
import MyTabs from '../components/Mainpage/Tabs';
import api from '../../api';

const MainPage = () => {
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
      document.cookie = 'token=; Max-Age=0; path=/; domain=' + window.location.hostname;
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <Header/>
      <main className="flex-grow flex items-center justify-center">
        <MyTabs/>
      </main>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default MainPage;
