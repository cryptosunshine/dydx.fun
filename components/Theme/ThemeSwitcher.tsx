// ThemeSwitcher.tsx
import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {

  const [theme, setTheme] = useState('default');

  useEffect(() => {
    //读取本地存储的主题
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme)
    }
  },[])

  const handleChangeTheme = (newTheme: string) => {
    if(!newTheme) {
      document.documentElement.classList.remove(theme);
      setTheme('default');
      return;
    }
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div>
      <button onClick={() => handleChangeTheme('')}>Default Theme</button>
      <button onClick={() => handleChangeTheme('theme-blue')}>Blue Theme</button>
      <button onClick={() => handleChangeTheme('theme-red')}>Red Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
