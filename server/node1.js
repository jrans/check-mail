/**
 * Check Mail. DAG's 'Node1' node implementation
 */
'use strict';

// Entry point for DAG node
// got ={
//   in: ... // contains the key/value pairs that match the given query
//   with: ... // key/value pairs selected based on the with selection
//   lookup: ... // an array with result of lookup for a specific key
//   query: ... // an array containing the key hierarchy
// }
// for more info have a look at:
// http://docs.redsift.com/docs/server-code-implementation
module.exports = function (got) {
  const inData = got.in;

  console.log('check-mail: node1.js: data received:', inData.data);

  const json = inData.data.map(d => JSON.parse(d.value));
  json.forEach(function (value, i) {
    console.log('datum#', i, 'value:', value);
  });

  return [{
    name: 'output1',
    key: 'dataLength',
    value: json.length
  }];
};
