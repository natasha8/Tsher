import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { AIPicker, Button, ColorPicker, FilePicker, Tab } from "../components";
import { reader } from "../config/helpers";

import state from "../store";
const Sidebar = () => {
	const snap = useSnapshot(state);

	const [file, setFile] = useState("");
	console.log("file", file);

	const [activeEditorTab, setActiveEditorTab] = useState("");
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		stylishShirt: false,
	});

	const [prompt, setPrompt] = useState("");

	const [genImg, setGenImg] = useState(false);

	const handlePrompt = (e) => {
		setPrompt(e.target.value);
	};
	//generate tab content depending on the activeTab
	const generateTabContent = () => {
		switch (activeEditorTab) {
			case "colorpicker":
				return <ColorPicker />;
			case "filepicker":
				return (
					<FilePicker
						file={file}
						setFile={setFile}
						readFile={readFile}
					/>
				);
			case "aipicker":
				return (
					<AIPicker
						prompt={prompt}
						handlePrompt={handlePrompt}
						genImg={genImg}
						handleSubmit={handleSubmit}
					/>
				);
			default:
				return null;
		}
	};

	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type];

		state[decalType.stateProperty] = result;

		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab);
		}
	};

	const handleActiveFilterTab = (tabName) => {
		switch (tabName) {
			case "logoShirt":
				state.isLogoTexture = !activeFilterTab[tabName];

				break;
			case "stylishShirt":
				state.isFullTexture = !activeFilterTab[tabName];
				break;
			default:
				state.isLogoTexture = true;
				state.isFullTexture = false;
				break;
		}
		setActiveFilterTab((prevState) => {
			return {
				...prevState,
				[tabName]: !prevState[tabName],
			};
		});
	};

	const readFile = async (type) => {
		try {
			console.log("TYPE", type);
			const result = await reader(file);
			console.log("RESULT", result, "TYPE", type);
			handleDecals(type, result);
			setActiveEditorTab("logo");
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (type) => {
		if (!prompt) return alert("Please enter a prompt");

		try {
			setGenImg(true);

			const response = await fetch("http://localhost:8080/api/v1/dalle", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt,
				}),
			});
			const data = await response.json();

			handleDecals(type, `data:image/png;base64,${data.photo}`);
		} catch (error) {
			alert(error);
		} finally {
			setGenImg(false);
			setActiveEditorTab("");
		}
	};

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key="custom"
						className="absolute top-0 left-0 z-10"
						{...slideAnimation("up")}
					>
						<div className="flex items-center min-h-screen">
							<div className="editortabs-container tabs">
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() =>
											setActiveEditorTab(tab.name)
										}
									/>
								))}
								{generateTabContent()}
							</div>
						</div>
						<motion.div
							className="absolute z-10 top-5 right-5"
							{...fadeAnimation}
						>
							<img
								src="/back.png"
								alt="logo"
								className="w-fit pl-4 py-2.5"
								onClick={() => (state.intro = true)}
							/>
						</motion.div>
						<motion.div
							className="filtertabs-container"
							{...slideAnimation("up")}
						>
							{" "}
							{FilterTabs.map((tab) => (
								<Tab
									key={tab.name}
									tab={tab}
									isFilterTab
									isActiveTab={activeFilterTab[tab.name]}
									handleClick={() =>
										handleActiveFilterTab(tab.name)
									}
								/>
							))}
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Sidebar;
