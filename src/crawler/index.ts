import { HTMLElement, parse } from "node-html-parser";

import { URIStructure } from "./types";
import fetch from "cross-fetch";

export class Crawler {
	private async getDOM(url: string) {
		const response = await fetch(url);
		const responseText = await response.text();

		return parse(responseText);
	}

	private getUniqueUrls(root: HTMLElement): string[] {
		const foundAnchors = root.querySelectorAll("a");
		const hrefArr = foundAnchors
			.map((anchor) => anchor.getAttribute("href"))
			.filter((href): href is string => href != undefined);

		const uniqueHrefs = new Set(hrefArr);

		return [...uniqueHrefs].filter((v) => v.startsWith("http"));
	}

	public async createStructure(baseUrl: string) {
		const structure: URIStructure = {};

		const crawl = async (url: string) => {
			const root = await this.getDOM(url);
			const links = this.getUniqueUrls(root);

			structure[url] = links;

			if (links && links.length > 0) {
				for await (const link of links) {
					if (!structure.hasOwnProperty(link) && link.includes(baseUrl)) await crawl(link);
				}
			} else return links;
		};

		await crawl(baseUrl);

		return structure;
	}
}
