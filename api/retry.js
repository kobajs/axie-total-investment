async function retry(fn, conditionFn, times = 3) {
  let result = await fn();
  for (let i = 0; i < times && !conditionFn(result); i++) {
    result = await fn();
  }

  return result;
}

module.exports = { retry };
