import cachedData from "../cachedData.json";
import { createPage } from "../components/createPage";
import {JSObjectFromJSON} from "../components/dataProcessing";

export default function Home() {
    //Converts the raw loaded data into a more useable form
    //This is what all functions should use, rather than relying on any specifics of the JSON represetnation (which is not stable).
    const JSObject = JSObjectFromJSON(cachedData.PyPI as [any, {dep: number, dependencies: (string | number)[][]}[]] | never[])

	return createPage(JSObject)
}