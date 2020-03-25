/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is
 * resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed,
 * resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed,
 * and rejected with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  const positiveReaction = 'Hooray!!! She said "Yes"!';
  const negativeReaction = 'Oh no, she said "No".';
  const errorReaction = 'Wrong parameter is passed! Ask her again.';

  return new Promise((resolutionFunc, rejectionFunc) => {
    if (isPositiveAnswer === true) resolutionFunc(positiveReaction);
    else if (isPositiveAnswer === false) resolutionFunc(negativeReaction);
    else rejectionFunc(new Error(errorReaction));
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
const processAllPromises = (array) => new Promise((resolve, reject) => {
  const arr = [...array]; let c = arr.length; const
    results = [];
  arr.map(Promise.resolve, Promise)
    .map((p, i) => p.then((v) => {
      results[i] = v;
      c -= 1;
      if (c === 0) resolve(results);
    }, reject));
});

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
const getFastestPromise = (array) => Promise.race(array);

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */

function chainPromises(promises, func) {
  return new Promise((resolve) => {
    const result = [];
    for (let i = 0; i < promises.length; i += 1) {
      promises[i].then((value) => result.push(value), (value) => new Error(value));
    }
    resolve(result);
  }).then((result) => result.reduce(func));
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
