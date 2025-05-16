export class DataLoader {
    constructor(element) {
      this.container = element;
      this.loadFromAPI(element.dataset.api)
        .catch(() => this.loadFallback(element.dataset.fallback));
    }
  
    async loadFromAPI(endpoint) {
      const response = await fetch(endpoint);
      this.render(await response.json());
    }
  }