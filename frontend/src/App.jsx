import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';
import StudentDashboard from './pages/student';
import { LabSection } from './components/labs/LabSection';
import TeacherDashboard from './pages/Teacher';
import CodeEdit from './pages/code';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
            <Route index element={<Home />} />
            <Route path='CodeEditor' element={<CodeEditor/>}/>
<<<<<<< HEAD
            <Route path="studentDashboard" >
=======
            {/* <Route path='CodeEdit' element={<CodeEditor/>}/> */}
            <Route path="studentDashboard" element={<StudentDashboard/>} >
>>>>>>> 25effba15e4a49491732a149188265e15a2772b4
                <Route path='dashboard' element={<StudentDashboard/>}/>
                <Route path='labs' element={<LabSection/>}/>
                <Route path='assignment' element={<StudentDashboard/>}/>
            </Route>
            <Route path="teacherDashboard" element={<TeacherDashboard/>}/>
            <Route path="students">
                <Route path='signin' element={<Login/>}/>
            </Route>
            {/* Updated path for StudentDashboard */}
            {/* <Route path="teacherDashboard/*" element={<TeacherDashboard />} /> Updated path for StudentDashboard */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
