import './App.css';
import SoundButton from './SoundButton';
import Rotate from './Rotate';


function App() {
  return (
    <>
      <div className='container'>
        <SoundButton sound = 'success.mp3' icon='good.svg' text='Success'></SoundButton>
      </div>
      <div className='container'>
        <SoundButton sound = 'L.mp3' icon='left.svg' text='Left'></SoundButton>
        <SoundButton sound = 'start.mp3' icon='walking.svg' text='Start'></SoundButton>
        <SoundButton sound = 'R.mp3' icon='right.svg' text='Right'></SoundButton>
      </div>
      <div className='container'>
        <SoundButton sound = 'bad.mp3' icon='bad.svg' text='Fail'></SoundButton>
      </div>
      <div className='container' style={{gap: '30px'}}>
        <Rotate sound='wind.mp3' icon='wind.svg' text='Wind' volume='0.3'></Rotate>
        <Rotate sound='ping.mp3' icon='ping.svg' text='Ping' volume='0.3'></Rotate>
      </div>
    </>
  );
}

export default App;
