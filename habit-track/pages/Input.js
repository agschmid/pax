'use client'

import * as React from 'react';
import { useState, useEffect }  from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';import { createTheme } from '@mui/material/styles';

export default function Input() {
  const [advice, setAdvice] = useState(false)
  const [task, setTask] = useState('')
  const [detail, setDetail] = useState('')
  const [isInitialMount, setInitialMount] = useState(true);
  const [doable, setDoable] = useState('');
  const [relevance, setRelevance] = useState('');


  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      red: createColor('#ff7961'),
      green: createColor('#8bc34a'),
    },
  });

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("habit")) || 'Cleaning my house once a week';
    const storedDetail = JSON.parse(localStorage.getItem("detail")) || '';
    if (isInitialMount) {
      setTask(storedTask);
      setDetail(storedDetail);
      setInitialMount(false);
    }
  }, []);
  
  useEffect(() => {
    if (!isInitialMount) {
      localStorage.setItem("habit", JSON.stringify(task));
      localStorage.setItem("detail", JSON.stringify(detail));
    }
  }, [task, detail]);


  const sendTask = async () => {
    setAdvice('loading');
    console.log(detail)
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: `In 20 words, tell me to do an easy but relevant activity, that will set me up to do the given task. It should help me build a habit, for example, to the gym you may want to set your gym clothes out the night before. Task: ${task}. ${detail && "Extra details: " + detail}` }),
    });
    const data = await response.json();
    setAdvice(data); 
  };


  const sendReview = async () => {
    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ habit: task, advice: advice, relevance: relevance, doable: doable }),
    });
  };

  return (
    <>
      <Typography variant="h2" component="h2" style={{marginBottom:'30px'}}>
        Habit Helper
      </Typography>


      {!advice && 
        <div style={{"display": "flex", "alignItems":"center", "gap":'20px', "flexDirection": 'column'}}>
          <TextField style = {{width: 300}} id="outlined-error" label="What habit are you forming?" value={task} onChange={e => {setTask(e.target.value)}}/>
          <TextField style = {{width: 300}} id="outlined" label="Any extra details?" value={detail} onChange={e => {setDetail(e.target.value)}}/>
          <Button variant="outlined" onClick={sendTask}>Click for advice</Button>      
        </div>
      }

      {advice =='loading' &&
        <Typography variant="h4" component="h4" style={{margin:'20px'}}>
          Loading
        </Typography>      
      }


    {advice && advice!='loading' && 
      <div style={{width:"500px"}}>
      <Typography variant="h4" component="h4" style={{margin:'20px'}}>
        Good Job!
      </Typography>
      <Typography component="p" style={{marginBottom:'10px', textAlign:"left", marginBottom: '20px'}}>
        {advice}
      </Typography>
      <Typography variant="h5" component="p" style={{marginBottom:'20px', marginTop: '40px'}}>
        Prototype Feedback
      </Typography>


      <div style={{display: 'flex', gap:'80px'}}>
      <FormControl style={{textAlign: 'left'}}>
        <FormLabel id="demo-radio-buttons-group-label">How relevant is this advice?</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange = {(e) => {setRelevance(e.target.value)}}
        >
          <FormControlLabel value="1 - irrelevant" control={<Radio />} label="1 - irrelevant" />
          <FormControlLabel value="2 - somewhat irrelevant" control={<Radio />} label="2 - somewhat irrelevant" />
          <FormControlLabel value="3 - somewhat relevant" control={<Radio />} label="3 - somewhat relevant" />
          <FormControlLabel value="4 - relevant" control={<Radio />} label="4 - relevant" />
        </RadioGroup>
      </FormControl>

      <FormControl style={{textAlign: 'left'}}>
        <FormLabel id="demo-radio-buttons-group-label">How doable is this advice?</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange = {(e) => {setDoable(e.target.value)}}
        >
          <FormControlLabel value="1 - undoable" control={<Radio />} label="1 - undoable" />
          <FormControlLabel value="2 - not very doable" control={<Radio />} label="2 - not very doable" />
          <FormControlLabel value="3 - somewhat doable" control={<Radio />} label="3 - somewhat doable" />
          <FormControlLabel value="4 - very doable" control={<Radio />} label="4 - very doable" />
        </RadioGroup>
      </FormControl>
      </div>
      <Button style={{margin:'10px'}} variant="contained" onClick={(e) => {setAdvice(false); sendReview();}}>{`Submit`}</Button>   

         
      </div>
    }    
    </>
  );
}
