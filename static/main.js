// Remove any module import if using CDN Axios (i.e. remove: import axios from 'axios';)

function download() {
    const url = document.getElementById('text').value;
    const downloadType = document.getElementById('downloadType').value; // "video" or "audio"
    
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    
    axios.post("/download", { url: url, type: downloadType })
      .then(response => {
        const data = response.data;
        if (data.status === 'success') {
          alert('Download successful! Filename: ' + data.filename);
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  }
  
  window.download = download; // Expose the function globally
  