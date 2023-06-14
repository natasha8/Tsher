import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";
import Canvas from "./canvas";
function App() {
	return (
		<div className="app">
			<Home />
			<Canvas />
			<Sidebar />
		</div>
	);
}

export default App;
