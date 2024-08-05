import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import FancyCheckbox from './ui/FancyCheckbox';
import api from '../../api';

const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', 
        { email, password, rememberMe }, 
        { withCredentials: true }
      );
      if (response.data.success) {
        navigate('/main');
      } else {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className='p-2 border'
      />
      <Input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        className='p-2 border'
      />
      <div className="flex justify-start">
        <FancyCheckbox 
          checked={rememberMe} 
          onChange={(e) => setRememberMe(e.target.checked)} 
        />
        <label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Remember me
        </label>
      </div>
      <Button type="submit" variant="default" className="w-full p-2 rounded">Submit</Button>
      <p className="text-center">
        First time? <button type="button" onClick={onToggle} className="text-blue-500 hover:underline">Register</button>
      </p>
    </form>
  );
};

export default LoginForm;
