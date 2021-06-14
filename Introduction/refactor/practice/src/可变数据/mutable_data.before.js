function merge(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}