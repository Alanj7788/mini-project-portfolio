import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import { useEffect } from "react";
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

  const dispatch = useDispatch();


  const getPortfolioData= async()=>{
    try{
      dispatch(ShowLoading());
      const response= await axios.get('./api/portfolio/get-portfolio-data');
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
