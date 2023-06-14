import { useSnapshot } from "valtio";
import state from "../store";
import { motion, AnimatePresence } from "framer-motion";
import {
	headContainerAnimation,
	headTextAnimation,
	slideAnimation,
} from "../config/motion";
import Button from "../components/Button";

const Home = () => {
	const snap = useSnapshot(state);
	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section className="home" {...slideAnimation("left")}>
					<motion.header {...slideAnimation("down")}>
						<h1 className="text-pink-500 text-3xl uppercase font-extrabold">
							{" "}
							tsher
						</h1>
					</motion.header>
					<motion.div
						className="home-content"
						{...headContainerAnimation}
					>
						<motion.div {...headTextAnimation}>
							<h1 className="head-text">
								Let's
								<br className="xl:block hidden" /> do it
							</h1>
						</motion.div>
						<motion.div className="space-y-4">
							<p>
								<strong>Unleash your imagination </strong>
								and create your unique t-shirt
							</p>
							<Button
								type="filled"
								title="START NOW"
								handler={() => (state.intro = false)}
								customStyle="w-full px-4 py-4 font-bold my-4 "
							/>
						</motion.div>
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Home;
