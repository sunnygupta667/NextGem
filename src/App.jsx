import React, { useState } from 'react';
import './temp.css';
import axios from 'axios';

const App = () => {
  const [question, setQuestion]= useState('');
  const [response, setResponse]= useState('');

 const submitHandler=(e)=>{
   e.preventDefault();
  //  console.log(question)
  axios.post('https://next-gem-backend.vercel.app/getResponse',{
  // axios.post('http://localhost:3000/getResponse',{
    question:question
  }).then(res=>{
    // console.log(res.data.response);
    setResponse(res.data.response);
    
  }).catch(err=>{
    console.log(err);
  })
 }

 let isSpeaking = false; // Track if it's currently speaking

const speakHandler = () => {
  if (isSpeaking) {
    // If currently speaking, stop it
    window.speechSynthesis.cancel();
    isSpeaking = false;
  } else {
    // If not speaking, start it
    const sound = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(sound);
    isSpeaking = true;

    // When the speech ends, reset isSpeaking to false
    sound.onend = () => {
      isSpeaking = false;
    };
  }
};


  return (
    <>
      <div className="w-full h-screen bg-[#050412] flex flex-col justify-center items-center gap-16 p-4">
        {/* Image Container */}
        <div className="w-24 h-24 lg:h-44 lg:w-44 md:w-32 md:h-32 rounded-full animate-glow flex justify-center items-center overflow-hidden">
          <img 
            src="https://cdn.pixabay.com/photo/2024/05/08/05/21/ai-generated-8747423_640.jpg" 
            alt="AI Image" 
            className="w-full h-full object-cover lg:object-[0px_-38px] md:object-[0px_-28px] sm:object-[0px_-21px] object-[0px_-21px] rounded-full" 
          />
        </div>

        <div className="w-full flex flex-col md:flex-row text-center gap-10 items-center">
          <div className="w-full md:w-1/2 mx-6 flex flex-col gap-7 justify-center items-center">
            <textarea onChange={(e)=>{setQuestion(e.target.value) }} className="w-4/5 md:w-full animate-glow2 text-white scroll-smooth p-3 text-[16px] resize-none font-mono h-36  md:h-72 rounded-lg bg-transparent outline-none border-none" placeholder="Enter text..." />
           
            <button onClick={submitHandler} className="w-4/5 md:w-full p-2 text-lg md:text-xl font-bold font-mono text-white rounded-[4px] bg-gradient-to-r from-gray-950 via-purple-950 to-gray-950 shadow-lg shadow-purple-500/50 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:shadow-sky-500/50 hover:from-gray-950 hover:via-sky-950 hover:to-gray-950">
              Generate
            </button>
          </div>

          <div className="w-full md:w-1/2 mx-6 flex flex-col gap-8 justify-center items-center">
            <textarea value={response}   className="w-4/5 resize-none caret-transparent   md:w-full animate-glow2 text-white scroll-smooth p-3 text-[16px] font-mono h-36 md:h-72 rounded-lg bg-transparent outline-none border-none" />
            <button  onClick={speakHandler} className="w-4/5 md:w-full p-2 text-lg md:text-xl font-bold font-mono text-white rounded-[4px] bg-gradient-to-r from-gray-950 via-purple-950 to-gray-950 shadow-lg shadow-purple-500/50 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:shadow-sky-500/50 hover:from-gray-950 hover:via-sky-950 hover:to-gray-950">
              Speak
            </button>
          </div>
        </div> 
      </div>
    </>
  );
}

export default App;
