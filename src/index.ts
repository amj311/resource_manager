import { ResourceLib, ResourceType } from "./ResourceModels";
import constructImportableUrl from "./UrlGenerator";

const resources:ResourceLib = require("./resources.json")

// type LoadProps = {
//     version: string,
//     eager?: boolean
// }

type ResourcesRequest = { [resource:string]: string }


export function load(request: ResourcesRequest) {
    for (let [res, version] of Object.entries(request)) {
        injectResource(res,version);
    }
}

export function injectResource(resource: string, version:string): void {
    // get access url from library
    let res = resources[resource];
    if (!res) {
        throw new Error("Could not find resource: " + resource);
    }
    let url = constructImportableUrl(res, version);

    // inject import
    injectImportElement(res.type, url);    
}


const ImportCreators: { [type:string]:(url:string,props:any)=>void } = {
    js: injectJsImport,
    // css: parseGithubStFile,
}

function injectImportElement(type:ResourceType, url: string, props?: any) {
    return ImportCreators[type](url,props);
}

function injectJsImport(url:string,props:any) {
    let el = document.createElement("script");
    el.setAttribute("src",url)
    document.head.appendChild(el);
}