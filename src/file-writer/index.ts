import { Crawler } from "../crawler";
import Logger from "../logger";
import { URIStructure } from "../crawler/types";
import { writeFile } from "fs/promises";

export class FileWriter extends Crawler {
	private indentation = "\t";
	private newLine = "\n";

	private arrangeFormat(obj: URIStructure) {
		let result = "";

		const format = (obj: any) => {
			Object.keys(obj).forEach((key) => {
				if (typeof obj[key] === "object") {
					result += key + this.newLine;

					return format(obj[key]);
				} else {
					result += this.indentation + obj[key];
				}

				result += this.newLine;
			});
		};

		format(obj);

		return result;
	}

	public async writeToFile(baseUrl: string, filepath: string): Promise<void> {
		const structure = await this.createStructure(baseUrl);

		const result = this.arrangeFormat(structure);

		try {
			await writeFile(`${filepath}`, result);
			Logger.info("✅ File has been created");
		} catch (err) {
			Logger.error("❌ Error while trying to write file: ", err);
		}
	}
}
