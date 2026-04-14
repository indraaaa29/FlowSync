'use client';
import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const nextThemeLabel = mounted
    ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
    : 'Toggle theme';

  const iconName = mounted
    ? theme === 'light'
      ? 'dark_mode'
      : 'light_mode'
    : 'contrast';

  return (
    <button 
      className={styles.toggle} 
      onClick={toggleTheme}
      title={nextThemeLabel}
      aria-label={nextThemeLabel}
    >
      <span className="material-symbols-outlined">
        {iconName}
      </span>
    </button>
  );
}
