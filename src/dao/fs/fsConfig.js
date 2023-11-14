import fs from 'fs';

class FSConfig {
  constructor(path) {
    this.path = path;
  }

  toJSON(list) {
    return JSON.stringify(list, null, "\t");
  }

  toArray(list) {
    return JSON.parse(list);
  }

  async write(list) {
    try {
      await fs.promises.writeFile(this.path, this.toJSON(list), "utf-8");
    } catch (error) {
      return null;
    }
  }

  async read() {
    if (!fs.existsSync(this.path)) {
      return null;
    }

    try {
      const list = await fs.promises.readFile(this.path, "utf-8");
      return this.toArray(list);
    } catch (error) {
      return null;
    }
  }
}

export default FSConfig;
