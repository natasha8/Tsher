import { Center, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CameraRig from "./CameraRing";
import TShirt from "./TShirt";
import Backdrop from "./Backdrop";

const Model = () => {
	return (
		<Canvas
			shadows
			camera={{ position: [0, 0, 0], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
			className="w-full max-w-full h-full transition-all ease-in "
		>
			<ambientLight intensity={0.6} />
			<Environment preset="city" />

			<CameraRig>
				<Backdrop />
				<Center>
					<TShirt />
				</Center>
			</CameraRig>
		</Canvas>
	);
};

export default Model;
