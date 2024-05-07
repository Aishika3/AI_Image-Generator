import logo from './logo.svg';
import './App.css';
//import Head from 'next/head';
//import Image from 'next/image';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

*/
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const maxRetries = 20;
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  const [retry, setRetry] = useState(0);
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState('');

  const generateAction = async () => {
    console.log('Generating...');

    if (isGenerating && retry === 0) return;

    setIsGenerating(true);

    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });

      setRetry(0);
    }

    try {
      const response = await axios.post(
        '/api/generate',
        { input },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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', // Replace YOUR_ACCESS_TOKEN with your actual access token
          },
        }
      );

      const { image } = response.data;
      setFinalPrompt(input);
      setInput('');
      setImg(image);
    } catch (error) {
      console.log('Error generating image:', error);
    }

    setIsGenerating(false);
  };

  const onChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div
      className="root"
      style={{
        fontFamily: 'Arial',
        textAlign: 'center',
        display: 'flex',
        placeContent: 'center flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(0, 0, 0)',
        flexFlow: 'column nowrap',
        gap: '10px',
        height: '100vh',
        overflow: 'auto',
        padding: '0px',
        position: 'relative',
      }}
    >
      <head>
        <title>AI Avatar Generator | buildspace</title>
      </head>
      <div
        className="container"
        style={{
          margin: '20px',
          display: 'flex',
          flex: '0 0 auto',
          flexFlow: 'column nowrap',
          height: '100%',
          overflow: 'auto',
          position: 'relative',
          width: 'auto',
        }}
      >
        <div
          className="header"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: '#FFF',
            marginTop: '20px',
          }}
        >
          <div
            className="header-title"
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                width: '100%',
                letterSpacing: '-1px',
                lineHeight: '1.2em',
                textAlign: 'center',
                marginTop: '2px',
              }}
            >
              Avatar Generator
            </h1>
          </div>

          <div className="header-subtitle">
            <h2
              style={{
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '1.4em',
                color: 'rgba(255, 255, 255, 0.75)',
                marginTop: '5px',
              }}
            >
              Description of your generator
            </h2>
          </div>
        </div>
      </div>

      <div
        className="prompt-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '100px',
        }}
      >
        <input
          className="prompt-box"
          type="text"
          value={input}
          onChange={onChange}
          placeholder="Enter your input"
        />
        <div className="prompt-buttons">
          <a className="generate-button" onClick={generateAction}>
            <div className="generate">
              <p>Generate</p>
            </div>
          </a>
        </div>
      </div>

      {img && (
        <div className="output-content">
          <img src={img} width={512} height={512} alt={finalPrompt} />
          <p>{finalPrompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;
