import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/Button';
import { Moon, Sun } from 'lucide-react'

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default DarkModeToggle;