import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegisterStudent from "./components/registerStudent";
import { Route, Routes ,Link} from "react-router-dom";
import Home from "./components/Home";
import CompanyRegister from "./views/companyRegister";
//import RegisterCompany from "./components/registerCompany";


function App() {
	// const [count, setCount] = useState(0);
	const [isStudent, setIsStudent] = useState(false);
	const [isEnterprise, setIsEnterprise] = useState(false);

	const [isGo, setIsGo] = useState(false);

	const [isStudentName, setIsStudentName] = useState("");

	const handleClickStudent = (e) => {
		setIsStudent(!isStudent);
		setIsEnterprise(false);
	};

	const handleClickEnterprise = (e) => {
		setIsEnterprise(!isEnterprise);
		setIsStudent(false);
	};

	const handleClickGo = (e) => {
		setIsGo(!isGo);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsStudentName("");
	};

	return (
		<>
	  		<div>
				{/* <RegisterStudent/> */}
                <Routes>
                    <Route exact path='/Trends_app_MVP' element={<Home/>} />
                    <Route exact path='/registerStudent' element={<RegisterStudent/>} />
                    <Route exact path='/companyRegister' element={<CompanyRegister/>} />
                </Routes>
			</div>
			<div>

            </div>
		</>
	);
}

export default App;
