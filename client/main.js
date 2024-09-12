document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.getElementById('Convertbtn');
  convertButton.addEventListener('click', () => {
    console.log('Convert button clicked');
    const optionSelect = document.getElementById('option');
    const url = document.getElementById('Url_input').value;
    const option = optionSelect.value;
    const qualitySelect = document.getElementById('quality');
    const quality = qualitySelect ? qualitySelect.value : 'best'; // Default to 'best'
    
    console.log('URL:', url);
    console.log('Option:', option);
    console.log('Quality:', quality);

    fetch('http://localhost:3000/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, option, quality })
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      console.log('Server response:', text);
      // Handle the response here (e.g., trigger download)
    })
    .catch(error => {
      console.error('Error:', error);
      // Display error to the user
    });
  });
});