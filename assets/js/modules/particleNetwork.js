/*星空实现主逻辑*/
import * as THREE from 'three'; // 通过ES模块导入
// 在particleNetwork.js中添加
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
export function initParticleNetwork() {
  // 1. 场景初始化
  const canvas = document.getElementById('particle-network');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 30;

  // 2. 创建粒子系统
  const particles = 5000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particles * 3);
  const colors = new Float32Array(particles * 3);

  // 3. 随机粒子位置与颜色
  for (let i = 0; i < particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    colors[i * 3] = 0.1 + Math.random() * 0.3; // 蓝色基调
    colors[i * 3 + 1] = 0.6 + Math.random() * 0.4; // 青色高光
    colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // 白色亮点
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // 4. 着色器材质
  const material = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // 5. 动画循环
  function animate() {
    requestAnimationFrame(animate);
    
    // 粒子缓慢旋转
    particleSystem.rotation.x += 0.0005;
    particleSystem.rotation.y += 0.001;
    
    renderer.render(scene, camera);
  }

  // 6. 响应式处理
  window.addEventListener('resize', () => {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  });

  animate();
}