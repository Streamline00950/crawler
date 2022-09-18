import { readFile, stat, unlink } from "fs/promises";

import { setup } from "../src";

// we assume it will take longer time to crawl through pages
jest.setTimeout(30 * 1000);

describe("File writer", () => {
	const filepath = "./test.txt";

	it("should fail on invalid url", async () => {
		const { fileWriter } = setup();

		await expect(fileWriter.writeToFile("https://invalid-url", filepath)).rejects.toThrow();
	});

	it("should complete with no errors", async () => {
		const { fileWriter } = setup();

		await expect(fileWriter.writeToFile("https://bfgames.com/", filepath)).resolves.not.toThrowError();
	});

	it("file should be created and have content", async () => {
		const exists = await stat(filepath)
			.then(() => true)
			.catch(() => false);

		const content = await readFile(filepath, "utf-8");

		expect(exists).toBe(true);
		expect(content).not.toBe("");
	});

	beforeAll(async () => {
		const exists = await stat(filepath)
			.then(() => true)
			.catch(() => false);

		if (exists) unlink(filepath);
	});
});
