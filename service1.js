const { service1Exception } = require('./exceptions');
const { callService2 } = require('./service2');

async function callService1() {
  try {
    return await callService2();
  } catch (error) {
    throw service1Exception(error, { testArg: 'plop' });
  }
}

module.exports = {
  callService1,
};
