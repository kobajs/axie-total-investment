function now() {
  return new Date().toLocaleDateString("pt-BR").replaceAll("/", "_");
}

module.exports = {
  now,
};
