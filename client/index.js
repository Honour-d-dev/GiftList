const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require( 'prompt-sync')();

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  let name = prompt("enter your name: ");
  const merkle = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkle.getProof(index); 

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: proof
  });

  console.log({ gift });
}

main();