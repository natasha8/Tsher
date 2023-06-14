import Button from "./Button";

const AIPicker = ({
	prompt,
	setPrompt,
	genImg,
	handleSubmit,
	handlePrompt,
}) => {
	return (
		<div className="aipicker-container">
			<textarea
				placeholder="Ask AI..."
				rows={5}
				value={prompt}
				onChange={handlePrompt}
				className="aipicker-textarea"
			/>
			<div className="flex flex-wrap gap-3">
				{genImg ? (
					<Button
						type="outline"
						title="Asking AI..."
						customStyles="text-xs"
					/>
				) : (
					<>
						<Button
							type="outline"
							title="AI Logo"
							handler={() => handleSubmit("logo")}
							customStyles="text-xs"
						/>

						<Button
							type="filled"
							title="AI Full"
							handler={() => handleSubmit("full")}
							customStyles="text-xs"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AIPicker;
