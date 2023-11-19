
import './App.css';

import React, { useState } from 'react';

const App = () => {
  const [panelText, setPanelText] = useState(Array(10).fill(''));
  const [comicPanels, setComicPanels] = useState(Array(10).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  

  const generateComic = async () => {
    try {
      const responses = await Promise.all(
        panelText.map(text => query({ inputs: text }))
      );
       
      setComicPanels(responses.map(response => URL.createObjectURL(response)));
      setErrorMessage(''); // Reset error message on success
  
      
    } catch (error) {
      setErrorMessage('Failed to generate comic. Please try again.');

    }
  };

  const query = async (data) => {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  };

  return (
    <div className="app">
      <form className="comic-form">
        <h1>Comic Details</h1>
        {panelText.map((text, index) => (
          <textarea
            key={index}
            value={text}
            onChange={(e) => {
              const newText = e.target.value;
              setPanelText(prevText => prevText.map((item, i) => (i === index ? newText : item)));
            }}
            placeholder={`Enter text for panel ${index + 1}`}
          ></textarea>
        ))}
        <button type="button" onClick={generateComic}>Generate Comic</button>
      </form>
      <div className="comic-display">
            { comicPanels.map((panel, index) => (
              <img key={index} src={panel} alt={`Comic Panel ${index + 1}`} />
            ))}

          
        
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default App;
