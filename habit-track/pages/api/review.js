import fs from 'fs';

export default function handler(req, res) {
    try {
      // Async logic here
      const line = `${req.body.relevance},  ${req.body.doable}, ${req.body.habit}, ${req.body.advice}`
      writeToFile('/results/results.csv', line)
      res.status(200).json();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

// Function to write data to a text file
const writeToFile = (filePath, data) => {
    fs.appendFile(filePath, data + '\n', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      console.log('Data written to file successfully.');
    });
};
  