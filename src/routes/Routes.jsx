import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ProfileEdit from '../pages/ProfileEdit/ProfileEdit';
import Landing from '../pages/Landing/Landing';
import HomeworkList from '../pages/HomeworkList/HomeworkList';
import Main from '../pages/Main/Main';
import SearchResult from '../pages/SearchResult/SearchResult';
import Contact from '../pages/Contact/Contact';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomeworkAddEdit from '../pages/HomeworkAddEdit/HomeworkAddEdit';
import NoticeAddEdit from '../pages/NoticeAddEdit/NoticeAddEdit';
import Login from '../pages/Login/Login';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/profile-edit/:welcome' element={<ProfileEdit />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/homework-list' element={<HomeworkList />} />
      <Route path='/homework/:addOrEdit' element={<HomeworkAddEdit />} />
      <Route path='/notice/:addOrEdit' element={<NoticeAddEdit />} />
      <Route path='/search/:keyword' element={<SearchResult />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
);
 
export default Router;
