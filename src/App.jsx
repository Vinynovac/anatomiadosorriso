import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import History from "./components/History";
import BeforeAfter from "./components/BeforeAfter";
import Specialties from "./components/Specialties";
import Team from "./components/Team";
import Clinic from "./components/Clinic";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Appointment from "./components/Appointment";
import Footer from "./components/Footer";


function App(){

const [loading,setLoading] = useState(true);


return(

<>

{
loading &&
<Loading finish={()=>setLoading(false)}/>
}


<Header/>

<Hero/>

<History/>

<BeforeAfter/>

<Specialties/>

<Team/>

<Clinic/>

<Testimonials/>

<Appointment/>

<FinalCTA/>

<Footer/>




</>

)

}


export default App;