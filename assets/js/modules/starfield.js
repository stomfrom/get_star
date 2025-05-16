/*背景星空*/
export function initStarfield() {
    const canvas = document.querySelector('.starfield-bg');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    const stars = [];
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 1000);
  
    // 创建星星
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speed = 0.1 + Math.random() * 0.5;
        this.opacity = Math.random();
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseDir = 1;
      }
  
      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
        
        // 呼吸效果
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 1 || this.opacity < 0.3) {
          this.pulseDir *= -1;
        }
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }
  
    // 初始化星空
    function setup() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    }
  
    // 动画循环
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制银河光带
      ctx.fillStyle = 'rgba(32, 18, 77, 0.2)';
      ctx.fillRect(0, canvas.height * 0.3, canvas.width, canvas.height * 0.4);
      
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      
      requestAnimationFrame(loop);
    }
  
    setup();
    loop();
  
    // 视差效果
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      canvas.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    });
  }