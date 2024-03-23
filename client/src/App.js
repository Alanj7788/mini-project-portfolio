import { BrowserRouter,Routes,Route} from "react-router-dom";
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


function App() {
  const {loading,portfolioData, reloadData}= useSelector(state=>state.root);
const[data,setdata] = useState('')
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};
console.log(user.id)

  const getPortfolioData= async()=>{
    try{
      dispatch(ShowLoading());
      console.log(user.id)
      const response= await axios.get('./api/portfolio/get-portfolio-data/user/'+user.id);
      setdata(response.data)
      console.log('result',response.data)
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
    <Route path="/admin" element={<Admin />} />
    <Route path="/" element={<Welcome />} />
    <Route path="/search" element={<Search />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/issue" element={<ContactIssue />} />
     </Routes>
     </BrowserRouter>
  );
}

export default App;
