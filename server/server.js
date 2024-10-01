const express = require("express");
const path = require("path");
const cors = require("cors");
const { youtubeDl } = require('youtube-dl-exec');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

function sanitizeFilename(filename) {
  return filename.replace(/[^\w\s-]/g, '')
                 .trim()
                 .replace(/\s+/g, '_')
                 .replace(/_+/g, '_')
                 .substring(0, 200);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

app.post("/download", async (req, res) => {
  try {
    const { url, option } = req.body;
    console.log('Received request:', { url, option });

    if (!url || !option) {
      return res.status(400).send("Bad Request: Missing parameters");
    }

    const format = option === 'audioonly' ? 'bestaudio' : 'bestvideo+bestaudio';
    const ext = option === 'audioonly' ? 'mp3' : 'mp4';

    const output = `./downloads/%(title)s.${ext}`;

    console.log('Starting download...');
    const downloadResult = await youtubeDl(url, {
      format: format,
      output: output,
      extractAudio: option === 'audioonly',
      audioFormat: option === 'audioonly' ? 'mp3' : null,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot']
    });

    console.log('Download completed:', downloadResult);

    const filePath = downloadResult;
    const fileName = path.basename(filePath);
    const sanitizedFileName = sanitizeFilename(fileName);

    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFileName}"`);
    res.setHeader('Content-Type', option === 'audioonly' ? 'audio/mpeg' : 'video/mp4');

    await pipeline(fs.createReadStream(filePath), res);

    // Clean up: delete the file after sending
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    console.log('File sent successfully');

  } catch (error) {
    console.error('Server Error:', error);
    if (!res.headersSent) {
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});