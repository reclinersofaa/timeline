import './App.css';
import Getstarted from './getstarted';
import Home from './home';
import SecondHome from './secondhome';  // Import the SecondHome component
import KnowMe from './knowme';
import OurMission from './mission';
import Contact from './contact';
import FutureMe from './futureme';
import Timelines from './timeline';
import Login from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout'; // Import the layout component

function App() {
	return (
		<Router>
				<Layout>
						<Routes>
							{/* Route for Home Page */}
							<Route path="/" element={<Home />} />
							{/* Route for Get Started Page */}
							<Route path="/getstarted" element={<Getstarted />} />
							<Route path="/secondhome" element={<SecondHome />} />
							<Route path="/knowme" element={<KnowMe />} />
							<Route path="/mission" element={<OurMission />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/futureme" element={<FutureMe />} />
							<Route path="/timeline" element={<Timelines />} />
							<Route path="/login" element={<Login />} />
						</Routes>
				</Layout>
		 
		</Router>
	);
}

export default App;
