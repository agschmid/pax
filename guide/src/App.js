import './App.css';
import SoundButton from './SoundButton';

function App() {
  return (
    <div className='container'>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Look Left'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Walk Forward'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Look Right'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Walk'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Stop'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Walk'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Walk'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Walk'></SoundButton>
      <SoundButton sound = 'sound.mp3' icon='walking.svg' text='Walk'></SoundButton>
    </div>
  );
}

export default App;
