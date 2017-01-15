const { compose, prop } = require('ramda');

const trace = (value) => {
  console.log('trace: ', value);
  return value;
};

const extractValue = compose(JSON.parse, prop('value'));

module.exports = { trace, extractValue };
