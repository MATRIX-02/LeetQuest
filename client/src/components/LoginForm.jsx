import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import FancyCheckbox from './ui/FancyCheckbox';
import api from '../../api';

const LoginForm = ({ onToggle, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', 
        { email, password, rememberMe }, 
        { withCredentials: true }
      );
      if (response.data.success) {
        onLoginSuccess(response.data.user);
        navigate('/main');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
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
      <Button type="submit" variant="default" className="w-full p-2 rounded" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Submit'}
      </Button>
      <p className="text-center">
        First time? <button type="button" onClick={onToggle} className="text-blue-500 hover:underline">Register</button>
      </p>
    </form>
  );
};

export default LoginForm;