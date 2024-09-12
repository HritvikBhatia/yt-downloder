document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.getElementById('Convertbtn');

  convertButton.addEventListener('click', () => {
    const optionSelect = document.getElementById('option');
    const url = document.getElementById('Url_input').value;
    const option = optionSelect.value;
    const qualitySelect = document.getElementById('quality');
    const quality = qualitySelect ? qualitySelect.value : 'best'; // Default to 'best'

    console.log('Convert button clicked');
    fetch('http://localhost:3000/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, option, quality })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // Use text() to handle non-JSON responses
    })
    .then(text => console.log(text))
    .catch(error => console.error('Error:', error));
  });
});
