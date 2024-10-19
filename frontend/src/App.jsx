import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';
import StudentDashboard from './pages/student';
import { LabSection } from './components/labs/LabSection';
import TeacherDashboard from './pages/Teacher';
import CodeEdit from './pages/code';
import Login from './pages/Login';
// import Logout from './components/Logout'
import PrivateRoute from './components/PrivateRoute';
import StudentLayout from './pages/student';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
            <Route index element={<Home />} />
            {/* <Route path='CodeEdit' element={<CodeEditor/>}/> */}
            <Route path="students" element={null}>
                <Route path='signin' element={<Login/>}/>
                <Route element={<PrivateRoute role="students"/>}>
                    
                    <Route element={<StudentLayout/>}>
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='labs' element={<LabSection/>}/>
                            {/* <Route index element={<LabSection/>}/> */}
                        
                        
                        <Route path='assignment' element={<StudentLayout/>}/>
                       
                    </Route>
                    <Route path='labs/CodeEditor' element={<CodeEditor/>}/>
                    {/* <Route path='signout' element={<Logout/>}/> */}
                </Route>
                
            </Route>
            <Route path="teacherDashboard" element={<TeacherDashboard/>}/>
            {/* <Route path="students"> */}
            </Route>
            {/* Updated path for StudentDashboard */}
            {/* <Route path="teacherDashboard/*" element={<TeacherDashboard />} /> Updated path for StudentDashboard */}
        {/* </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App
