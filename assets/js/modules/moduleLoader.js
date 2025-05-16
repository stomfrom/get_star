import config from '../../utils/config.json';

export function initModules() {
  config.activeModules.forEach(module => {
    import(`/assets/js/modules/${module}.js`)
      .then(module => module.init())
      .catch(() => console.warn(`Module ${module} failed to load`));
  });
}