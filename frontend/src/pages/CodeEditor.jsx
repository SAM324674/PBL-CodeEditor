import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import Output from '../components/Output';

function CodeEditor() {
    const [value,setValue]=useState('');
    const editorRef=useRef();
    const onMount=(editor)=>{
        editorRef.current=editor;
    }

    // Monaco.languages.register({id:'python'});
  return (<>
    <div className='flex'>
        <div className='w-[40%] border'>question</div>
        <div className='w-[60%] gap-1 flex flex-col'>
            <Editor height="80vh"
             language="python"
             defaultValue="// some comment" 
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
  </>)
  
}

export default CodeEditor