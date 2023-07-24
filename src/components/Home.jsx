import { useState } from "react";

import { Route, Routes ,Link} from "react-router-dom";

function Home() {
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

			<div className="logo-app">
				<h1>Trends</h1>
				<h4>Hello </h4>
                <p>Are you a student or an enterprise ?</p>
                <Link to='/studentRegister'>
                    <button
                        style={{ margin: 10, padding: 10 }}
                    >Student</button>
                </Link>
                <Link to='/companyRegister'>
                    <button
                        style={{ margin: 10, padding: 10 }}
                    >Company</button>
                </Link>
			</div>
		</>
	);
}

export default Home;