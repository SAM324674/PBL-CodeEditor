import { useState } from 'react'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';
// import StudentDashboard from './pages/student';
import { LabSection } from './components/labs/LabSection';
// import TeacherDashboard from './pages/Teacher';
// import CodeEdit from './pages/code';
import Login from './pages/Login';
// import Logout from './components/Logout'
import PrivateRoute from './components/PrivateRoute';
// import Layout from './pages/Student';
import Dashboard from './components/Dashboard';
import Layout from './pages/Layout';
import Question from './components/Question';
import { questions } from './components/questions';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
            <Route index element={<Home />} />
            
           

            {/* *STUDENT ROUTES* */}
            <Route path="students" element={null}>
                <Route path='signin' element={<Login/>}/>
                <Route element={<PrivateRoute role="students"/>}>
                    
                    <Route element={<Layout/>}>
                        <Route path='dashboard' element={<Dashboard/>}/>
                        <Route path='labs' element={<LabSection/>}/>
                            {/* <Route index element={<LabSection/>}/> */}
                        <Route path='assignment' element={<Layout/>}/>
                       
                    </Route>
                    <Route path='labs/CodeEditor/question/' element={<CodeEditor/>}>
                        <Route path=':questionId' element={<Question/>} /> {/* Question route */}
                    </Route>
                    {/* <Route path='signout' element={<Logout/>}/> */}
                </Route>
            </Route>

            {/* *TEACHER ROUTES* */}
            <Route path="teachers" element={null}>
                <Route path='signin' element={<Login/>}/>
                <Route element={<PrivateRoute role='teachers'/>}>
                      <Route element={<Layout/>}>
                          <Route path='dashboard' element={<Dashboard/>}/>
                      </Route>
                </Route>
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
