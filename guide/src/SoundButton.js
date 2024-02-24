import './button.css';
import {Howl} from 'howler';


export default function SoundButton(props){
    var sound = new Howl({
        src: [`./sounds/${props.sound}`],
    });

    return (
        <div className='button' onClick={() => sound.play()}>
            <img src={`./icons/${props.icon}`} height={"70px"}/>
            <span>{props.text}</span>
        </div>
    )
}