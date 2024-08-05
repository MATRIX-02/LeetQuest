import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import api from '../../api';


const RegisterForm = ({ onToggle }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await api.post('/auth/signup', { username, email, password }, { withCredentials: true });
      if (response.data.success) {
        navigate('/main');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
        className='p-2 border'
      />
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
      <Input 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
        className='p-2 border'
      />
      <Button type="submit" className="w-full">Submit</Button>
      <p className="text-center">
        Already a user? <button type="button" onClick={onToggle} className="text-blue-500 hover:underline">Login</button>
      </p>
    </form>
  );
};

export default RegisterForm;