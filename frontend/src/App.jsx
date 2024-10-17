import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';
// import StudentDashboard from './pages/StudentDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/student';
import { LabSection } from './components/labs/LabSection';
import TeacherDashboard from './pages/Teacher';
import CodeEdit from './pages/code';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
            <Route index element={<Home />} />
            <Route path='CodeEditor' element={<CodeEditor/>}/>
            {/* <Route path='CodeEdit' element={<CodeEditor/>}/> */}
            <Route path="studentDashboard" element={<StudentDashboard/>} >
                <Route path='dashboard' element={<StudentDashboard/>}/>
                <Route path='labs' element={<LabSection/>}/>
                <Route path='assignment' element={<StudentDashboard/>}/>
            </Route>
            <Route path="teacherDashboard" element={<TeacherDashboard/>}/>
            {/* Updated path for StudentDashboard */}
            {/* <Route path="teacherDashboard/*" element={<TeacherDashboard />} /> Updated path for StudentDashboard */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
