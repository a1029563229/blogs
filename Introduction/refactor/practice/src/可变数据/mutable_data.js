function merge(target, source) {
  return {
    ...target,
    ...source
  }
}

module.exports = { merge };
