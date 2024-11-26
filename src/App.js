import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pagefirst from './Components/Pagefirst/Pagefirst';
import Studentform from './Components/Studentform/Studentform';
import StudentEventform from './Components/StudentEventform/StudentEventform';
import AddNewEventform from './Components/AddNewEventform/AddNewEventform';
import EventList from './Components/EventList/EventList';
import StudentEventList from './Components/StudentEventList/StudentEventList';
import YearLevel from './Components/BSITYearLevel/YearLevel';
import CoursesList from './Components/CoursesList/CoursesList';
import Login from './Components/Login/Login';
import Firstyearlist from './Components/BSIT/Firstyearlist';
import FirstyrBLIS from './Components/BLIS/FirstyrBLIS';
import Updatefirstyear from './Components/BSITUpdate/Updatefirstyear';
import StudentProfile from './Components/StudentProfile/StudentProfile';
import BSITSecondyearlist from './Components/BSIT/BSITSecondyearlist';
import BSITThirdyearlist from './Components/BSIT/BSITThirdyearlist';
import BSITFourthyearlist from './Components/BSIT/BSITFourthyearlist';
import LoginAdmin from './Components/Login/LoginAdmin';
import Adminpage from './Components/Adminpage/Adminpage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagefirst />} />
          {/* Log in student, Log in Admin */}
          <Route path="/login" element={<Login />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />

          {/* Admin landing page */}
          <Route path="/adminpage" element={<Adminpage />} />

          {/* BSIT year level. 1st, 2nd, 3rd, 4th */}
          <Route path="/firstyearlist" element={<Firstyearlist />} />
          <Route path="/bsitsecondyearlist" element={<BSITSecondyearlist />} />
          <Route path="/bsitthirdyearlist" element={<BSITThirdyearlist />} />
          <Route path="/bsitfourthyearlist" element={<BSITFourthyearlist />} />

          <Route path="/studentform" element={<Studentform />} />     
          <Route path="/yearlevel" element={<YearLevel />} />

          <Route path="/studenteventform" element={<StudentEventform />} />
          <Route path="/addeventform" element={<AddNewEventform />} />
          <Route path="/studenteventlist" element={<StudentEventList />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/courselist" element={<CoursesList />} />
          <Route path="/eventlist" element={<EventList />} />
          <Route path="/firstyearlist/updatefrstyear/:id" element={<Updatefirstyear />} />
          <Route path="/firstyearblis" element={<FirstyrBLIS />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
