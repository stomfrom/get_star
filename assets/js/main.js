import { initModules } from './modules/moduleLoader';
import { switchTheme } from './theme/themeSwitcher';

// 初始化系统
document.addEventListener('DOMContentLoaded', () => {
  initModules();
  switchTheme(localStorage.getItem('theme') || 'sci-fi');
});