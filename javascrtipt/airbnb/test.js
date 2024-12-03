class FileSystem {
  constructor() {
    this.root = {};
  }
  create(path) {
    const segments = this._getSegments(path);
    let current = this.root;
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      if (!current[segment]) {
        current[segment] = i === segments.length - 1 ? null : {};
      } else if (i === segments.length - 1 && current[segment] === "object") {
        throw new Error(`${segment} already exists as a folder`);
      }
      current = current[segment];
    }
  }
  get(path) {
    const segments = this._getSegments(path);
    let current = this.root;
    for (const segment of segments) {
      if (!current[segment]) {
        throw new Error(`Invalid path: ${path}`);
      }
      current = current[segment];
    }
    return current;
  }
  set(path, value) {
    const segments = this._getSegments(path);
    let current = this.root;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      if (!current[segment] || typeof current[segment] !== "object") {
        throw new Error(`Invalid path`);
      }
      current = current[segment];
    }
    const file = segments.length - 1;
    if (typeof current[file] === "object") {
      throw new Error(`${file} already exists as a folder`);
    }
    current[file] = value;
  }
}
