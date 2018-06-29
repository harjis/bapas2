const runInSequence = tasks => {
  return tasks.reduce(
    (taskPromise, fn) => taskPromise.then(fn),
    Promise.resolve()
  );
};

module.exports = runInSequence;
