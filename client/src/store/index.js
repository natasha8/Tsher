import { proxy } from "valtio";

const state = proxy({
	intro: true, //are we in the home page?
	color: "#ffff00",
	isLogoTexture: false, //are we displaying the logo?
	isFullTexture: false,
	logoDecal: "./robot.png",
	fullDecal: "./robot.png",
});

export default state;
