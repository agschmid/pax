import './button.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

export default function Slider(props) {
  const [sound, setSound] = useState(null); // State to store the Howl instance
  const [symbol, setSymbol] = useState(' ▶️')
  const [random, setRandom] = useState(Math.random() * (90) + -180)
  const [orientationListenerAdded, setOrientationListenerAdded] = useState(false);

  const requestOrientationAccess = async () => {
    try {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === 'granted') {
        if (!orientationListenerAdded) {
          window.addEventListener('deviceorientation', handleOrientation);
          setOrientationListenerAdded(true);
        }      
      } else {
        console.error('Permission denied for motion and orientation access');
      }
    } catch (error) {
      console.error('Error requesting motion and orientation permission:', error);
    }
  };
  
  const [winCount, setWinCount] = useState(0);
  
  const handleOrientation = useCallback((event) => {
    if (sound.playing()){
      const { alpha } = event;
      const rotationValue = Math.sin(random + alpha * Math.PI / 180);
      if (sound) {
        setSound(sound.stereo(rotationValue)); // Adjust stereo balance
        setSound(sound.volume(0.5 + Math.cos(random + alpha * Math.PI / 180) / 3));
      }
    
      if (0.5 + Math.cos(random + alpha * Math.PI / 180) / 3 > 0.8 && sound.playing()) {
        setWinCount(prevCount => prevCount + 1); 
      }
    }
  }, [sound, setSound, setWinCount, random]); // Add dependencies as needed
  

  useEffect(() => {
    const winSound = new Howl({
      src: [`./sounds/success.mp3`],
      volume: 0.1,
      loop: false,
    });
  
    if (winCount > 400 && sound.playing()) {
      sound.stop();
      winSound.play();
      setRandom(Math.random() * (90) + -180);
    }
  }, [winCount, handleOrientation, sound, random, setRandom]); // Add winCount as a dependency


  // Create a new Howl instance on component mount
  useEffect(() => {
    const soundInstance = new Howl({
      src: [`./sounds/${props.sound}`],
      volume: 1,
      loop: true,
    });

    // Pause event listener
    soundInstance.on('stop', () => {
        setSymbol(' ▶️');
        setWinCount(0);
    });

    // Pause event listener
    soundInstance.on('play', () => {
        setSymbol(' ⏸️');
    });

    setSound(soundInstance);

    // Cleanup on component unmount
    return () => {
      soundInstance.unload();
    };
  }, [props.sound, props.volume]);



  return (
    <div style={{'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column', 'marginTop': '20px'}}>
        <div className='button' onClick={() => {requestOrientationAccess(); sound.playing() ? sound.stop() : sound.play()}}>
            <img src={`./icons/${props.icon}`} height={"70px"} alt='icon'/>
            <span>{props.text + symbol}</span>
        </div>
    </div>
  );
};
