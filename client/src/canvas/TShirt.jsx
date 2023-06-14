/* eslint-disable react/no-unknown-property */
import { useSnapshot } from "valtio";
import { easing } from "maath";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import state from "../store";

const TShirt = () => {
	const snap = useSnapshot(state);
	const { nodes, materials } = useGLTF("/shirt_baked.glb");

	const logoTexture = useTexture(snap.logoDecal);
	const fullTexture = useTexture(snap.fullDecal);

	useFrame((state, delta) =>
		easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
	);

	const stateKey = JSON.stringify(snap);
	return (
		<group key={stateKey}>
			<mesh
				castShadow
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
			>
				{snap.isFullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={1}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[0, 0.05, 0.15]}
						rotation={[0, 0, 0]}
						scale={0.15}
						map={logoTexture}
						map-anisotropy={16}
						depthTest={false}
						depthWrite={true}
					/>
				)}
			</mesh>
		</group>
	);
};

export default TShirt;
