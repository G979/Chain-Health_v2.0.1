const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
 
const buildPath = path.resolve(__dirname, 'build');
 
fs.removeSync(buildPath);
 
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
 
 
var input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "Campaign.sol"
  ];
 
  fs.ensureDirSync(buildPath);
 
  solc.loadRemoteVersion('v0.8.11+commit.d7f03943', function(err, solcSnapshot) {
    if (err) {
      reject(false);
    } else {
      for(let contract in output) {
          fs.outputJSONSync(
              path.resolve(buildPath, contract.replace(":", "") + ".json"),
              output[contract]
          );
      }
    }
  });