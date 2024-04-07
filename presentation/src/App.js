import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [showImageDiv, setShowImageDiv] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const imageDivRef = useRef(null);

  const handleBackgroundClick = () => {
    setShowImageDiv(true);
  };

  const handleImageDivClick = () => {
    setShowIframe(true);
  };

  return (
    <div className="App" onClick={handleBackgroundClick}>
      <img src="/background.jpg" alt="Background" className="background-image" />
      <div className="popup-container" style={{ transform: showImageDiv ? 'translateY(0%)' : 'translateY(100%)' }} onClick={handleImageDivClick}>
        <div className="popup-content">
          <img src="/popup.jpg" alt="Overlay" className="popup-image" />
        </div>
      </div>
      {showIframe && (
        <div className="iframe-container">
          <div className="iframe-content">
            <iframe src="https://chess-captcha.performave.com" title="Example" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
