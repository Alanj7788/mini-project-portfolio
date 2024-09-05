import { BrowserRouter,Routes,Route} from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
import Home from './pages/Home';
import { useEffect,useState } from "react";
import Loader from "./components/Loader";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading, setPortfolioData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Welcome from "./pages/FirstPage/Welcome";
import Login from "./pages/Sign/Login";
import Register from "./pages/Sign/Register";
import Search from "./pages/FirstPage/Search";
import ContactIssue from "./pages/FirstPage/ContactIssue";
import ManageSearch from "./pages/Collegeofficial/ManageSearch";
import Ideas from "./pages/FirstPage/Ideas";
import ManageIdea from "./pages/Collegeofficial/ManageIdea";
import Navbar from "./components/Navbar";



function App() {
  const {loading,portfolioData, reloadData}= useSelector(state=>state.root);
const[data,setdata] = useState('')
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};
  const isLoggedIn = localStorage.getItem('static_value');

  

  const getPortfolioData= async()=>{
    try{
      dispatch(ShowLoading());
      console.log(user.id)
      const response= await axios.get('${apiUrl}/api/portfolio/get-portfolio-data/user/'+user.id);
      setdata(response.data)
      
      dispatch(setPortfolioData(response.data));
      
      dispatch(ReloadData(false))

      dispatch(HideLoading())
    }catch(error){
      dispatch(HideLoading())
    }
  };
  useEffect(()=>{
    if(!portfolioData) {
    getPortfolioData()
    }
  },[portfolioData]);

  useEffect(()=>{
  if(reloadData){
    getPortfolioData()
  }
},[reloadData]);

  return (
   <BrowserRouter>
   {loading ? <Loader /> :null}
   <Routes>
    <Route path="/portfolio" element={<Home />} />
    {isLoggedIn ? (<Route path="/edit" element={<Admin />} />): 
      (<Route path="/edit" element={<h1>Please Login</h1>}/>)}
    
    <Route path="/" element={<Welcome />} />
    <Route path="/search" element={<div><Navbar/><Search /></div>} />
    <Route path="/login" element={ <Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/issue" element={<div><Navbar/><ContactIssue /></div>} />

    {isLoggedIn ? (<Route path="/managesearch" element={<div><Navbar/><ManageSearch /></div>} />): 
      (<Route path="/managesearch" element={<h1>Only for admin login</h1>}/>)}
    {isLoggedIn ? (<Route path="/manageidea" element={<div><Navbar/><ManageIdea /></div>} />): 
      (<Route path="/manageidea" element={<h1>Only for admin login</h1>}/>)}

    
    <Route path="/ideas" element={<div><Navbar/><Ideas/></div>}/>
     </Routes>
     </BrowserRouter>
  );
}

export default App;
