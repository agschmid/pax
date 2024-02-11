import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const filePath = path.resolve('.', '/results/results.csv');
        
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", filePath);
            return res.status(404).json({ error: "File not found" });
        }
        
        // Read the file asynchronously
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).json({ error: "Error reading file" });
            }
            
            // Set response headers and send file data
            res.setHeader('Content-Type', 'text/csv');
            res.send(data);
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}