const express = require('express');
const { exec } = require('child_process');
const cors = require('cors'); // Import the 'cors' package

const app = express();
const port = 3001;

// Enable CORS for all routes
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
