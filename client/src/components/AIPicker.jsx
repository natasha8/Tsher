import Button from "./Button";
const AIPicker = (prompt, handlePrompt, genImg, handleSubmit) => {
	return (
		<div className="aipicker-container">
			<textarea
				rows={5}
				value={prompt}
				onChange={handlePrompt}
				className="aipicker-textarea"
			/>
			<div className="flex flex-wrap gap-3">
				{genImg ? (
					<Button
						type="outline"
						title="Magic is happening..."
						customStyles="text-xs"
					/>
				) : (
					<>
						<Button
							type="outline"
							title="AI Logo"
							handleClick={() => handleSubmit("logo")}
							customStyles="text-xs"
						/>

						<Button
							type="filled"
							title="AI Full"
							handleClick={() => handleSubmit("full")}
							customStyles="text-xs"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AIPicker;
