const express = require("express");
const ytdl = require("ytdl-core");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

app.post("/download", async (req, res) => {
  try {
    const { url, option } = req.body;

    if (!url || !option) {
      return res.status(400).send("Bad Request: Missing parameters");
    }

    const ytdlOptions = {
      filter: option === 'audioonly' ? 'audioonly' : 'audioandvideo'
    };

    res.setHeader('Content-Disposition', 'attachment; filename="download.mp4"');
    ytdl(url, ytdlOptions)
      .on('error', (error) => {
        console.error('Error with ytdl-core:', error);
        res.status(500).send('Error downloading video');
      })
      .pipe(res)
      .on('finish', () => {
        console.log('Download finished successfully');
      });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
