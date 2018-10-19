const { service2Exception } = require('./exceptions');

function timeoutError(fails = true) {
  return new Promise((resolve, reject) => {
    if (!fails) return resolve('plop');
    reject(new Error('TIMEOUT_ERROR'));
  });
}

async function callService2() {
  try {
    await timeoutError(false);
    return await timeoutError();
  } catch (error) {
    throw service2Exception(error);
  }
}

module.exports = {
  callService2,
};
