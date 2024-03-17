import './App.css';
import SoundButton from './SoundButton';
import Slider from './Slider';


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
        <Slider sound='wind.mp3' icon='wind.svg' text='Wind' volume='1'></Slider>
        <Slider sound='ping.mp3' icon='ping.svg' text='Ping' volume='0.3'></Slider>
      </div>
    </>
  );
}

export default App;
