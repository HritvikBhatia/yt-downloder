# YouTube Video/Audio Downloader

This project is a simple web-based tool that allows users to download either audio or video from YouTube by providing a video URL.

## Features

- **Audio Only**: Allows users to download just the audio from a YouTube video.
- **Audio and Video**: Option to download both video and audio together.
- Simple form for entering the YouTube video URL.
- Basic user interface with two options (audio or video) and a button to initiate the conversion.

## Prerequisites

- A web browser (Chrome, Firefox, etc.).
- Basic understanding of HTML, CSS, and JavaScript.
- A backend service (if required) for handling video/audio conversion.

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/HritvikBhatia/yt-downloder.git
   ```

2. Navigate to the project folder:
   ```bash
   cd yt-downloder
   ```

3. Open `index.html` in your browser to use the tool.

4. Choose between **Audio** or **Video** from the dropdown menu.
   
5. Paste the YouTube URL into the text field.

6. Click the **Convert** button to start the conversion process.

## Project Structure

The project contains the following files:

- **`index.html`**: The main HTML file for the user interface.
- **`style.css`**: The CSS file that styles the page elements.
- **`main.js`**: The JavaScript file that will handle the conversion logic.
  
## Example

```html
<select id="option">
  <option value="audioonly">Audio</option>
  <option value="audioandvideo">Video</option>
</select>
<input type="text" id="Url_input" placeholder="Paste URL here" />
<button id="Convertbtn">Convert</button>
```

## To Do

- Add server-side functionality to handle YouTube video conversion and downloading.
- Validate YouTube URLs and handle errors.
- Show progress of the conversion process.

## License

This project is licensed under the MIT License.
