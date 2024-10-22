import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import Output from '../components/Output';
import Navbar from '../components/Navbar';
import QuestionsSection from '../components/QuestionsSection';
import { Outlet } from 'react-router-dom';



function CodeEditor() {
    // const [toggle,setToggle]=useState(false);
    // console.log('codeeditor rendered')
    const [value,setValue]=useState('');
    const [isToggleQuestion,setIsToggleQuestion]=useState(false);
    const editorRef=useRef();
    const onMount=(editor)=>{
        editorRef.current=editor;
    }
    // const handleToggle=()=>{
    //     setIsToggle(!isToggle);
    // }
    const handleToggleQuestion=()=>{
      setIsToggleQuestion(!isToggleQuestion);
    }
    // Monaco.languages.register({id:'python'});
  return (<>
    <div className='h-[100vh] overflow-hidden'>
          <Navbar toggle={isToggleQuestion} setIsToggleQuestion={setIsToggleQuestion} handleToggleQuestion={handleToggleQuestion} />
          {/* <MdOutlineMenu /> */}
          {isToggleQuestion?
            <div className='z-30 absolute w-[100%] h-[100vh] scroll-m-0 overflow-y-scroll'><QuestionsSection/></div>:
            <div></div>}
          <div className='flex'>
              <div className='w-[40%] border'><Outlet/></div>
              <div className='w-[60%] gap-1 flex flex-col'>
                  <Editor height="80vh"
                  language="python"
                  defaultValue="import json \n
                                import sys"
                  theme="vs-dark"
                  value={value}
                  onChange={(value)=>{
                      setValue(value)
                  }}
                  onMount={onMount}
                  />
                  <Output value={editorRef}/>
              </div>
          
          </div>
    </div>
  </>)
  
}

export default CodeEditor