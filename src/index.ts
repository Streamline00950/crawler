import { FileWriter } from "./file-writer";

export const setup = () => {
	const fileWriter = new FileWriter();

	return {
		fileWriter,
	};
};

setup();
