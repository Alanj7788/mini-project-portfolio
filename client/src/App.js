import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import { useEffect } from "react";
import Loader from "./components/Loader";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading, setPortfolioData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Welcome from "./pages/common/Welcome";
import Login from "./pages/Sign/Login";
import Register from "./pages/Sign/Register";
import Search from "./pages/common/Search";
import ContactIssue from "./pages/common/ContactIssue";


function App() {
  const {loading,portfolioData, reloadData}= useSelector(state=>state.root);

  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

  const getPortfolioData= async()=>{
    try{
      dispatch(ShowLoading());
      const response= await axios.get('./api/portfolio/get-portfolio-data/'+user._id);
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
    <Route path="/" element={<Home />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/search" element={<Search />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/issue" element={<ContactIssue />} />
     </Routes>
     </BrowserRouter>
  );
}

export default App;
