function parseYAML(yamlString) {
  const lines = yamlString.split('\n');
  const yamlObject = {};

  for (const line of lines) {
    const [key, value] = line.split(':').map(part => part.trim());
    if (key && value) {
      yamlObject[key] = value;
    }
  }

  return { server: yamlObject };
}

module.exports = { parseYAML };