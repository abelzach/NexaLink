const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const snarkjs = require('snarkjs');

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.post('/execute-script', (req, res) => {
  const { argument } = req.body;
  exec('sui client active-address', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
        }
        console.log(`sui client: ${stdout}`);
    });

  // Execute the shell script with the argument
  exec(`zsh sui.zsh "${argument}"`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`Script Output: ${stdout}`);
    console.log(stdout);
  });
});

app.get('/generate-proof', async function (req, res) {
  try {
      const inputs = JSON.parse(req?.query?.inputs);
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
          inputs, 
          "circuit.wasm", 
          "circuit_0001.zkey"
      );
      return res.send(JSON.stringify([proof, publicSignals]));
  } catch(e) {
      console.log(e);
      return res.status(500);
  }
});

app.get('/generate-calldata', async function (req, res) {
  try {
      const proof = JSON.parse(req?.query?.proof);
      const publicSignals = JSON.parse(req?.query?.publicSignals);
      const calldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
      return res.send(JSON.stringify(calldata));
  } catch(e) {
      console.log(e);
      return res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
