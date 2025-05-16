const themes = {
    'sci-fi': '/assets/css/theme/sci-fi.css',
    'cyberpunk': '/assets/css/theme/cyberpunk.css'
  };
  
  export function switchTheme(name) {
    const link = document.getElementById('theme-css');
    link.href = themes[name] || themes['sci-fi'];
    
    // 保存用户选择
    localStorage.setItem('theme', name);
    document.documentElement.setAttribute('data-theme', name);
  }