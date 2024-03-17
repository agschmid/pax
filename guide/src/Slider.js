import './button.css';
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

export default function Slider(props) {
  const [balance, setBalance] = useState(0); // Initial balance is centered
  const [sound, setSound] = useState(null); // State to store the Howl instance
  const [symbol, setSymbol] = useState(' ▶️')

  // Create a new Howl instance on component mount
  useEffect(() => {
    const soundInstance = new Howl({
      src: [`./sounds/${props.sound}`],
      volume: props.volume, // Set the volume to 50%
      loop: true,
    });

    // Pause event listener
    soundInstance.on('stop', () => {
        setSymbol(' ▶️')
    });

    // Pause event listener
    soundInstance.on('play', () => {
        setSymbol(' ⏸️')
    });

    setSound(soundInstance);

    // Cleanup on component unmount
    return () => {
      soundInstance.unload();
    };
  }, [props.sound, props.volume]);

  // Adjust the L-R balance
  const handleChange = (event) => {
    const newBalance = parseFloat(event.target.value);
    setBalance(newBalance);
    if (sound) {
      setSound(sound.stereo(newBalance)); // Adjust stereo balance
    }
    console.log(newBalance)
  };

  return (
    <div style={{'display': 'flex', 'alignItems': 'center', 'flexDirection': 'column', 'marginTop': '20px'}}>
      <input
        type="range"
        min="-1"
        max="1"
        step="0.1"
        value={balance}
        onChange={handleChange}
      />
        <div className='button' onClick={() => sound.playing() ? sound.stop() : sound.play()}>
            <img src={`./icons/${props.icon}`} height={"70px"} alt='icon'/>
            <span>{props.text + symbol}</span>
        </div>
    </div>
  );
};
