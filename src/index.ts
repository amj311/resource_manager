import { ResourceLib, ResourceType } from "./ResourceModels";
import constructImportableUrl from "./UrlGenerator";

const resources:ResourceLib = require("./resources.json")

type LoadProps = {
    version: string,
    eager?: boolean
}

type ResourcesRequest = { [resource:string]: LoadProps }


export function load(request: ResourcesRequest) {
    for (let [res, props] of Object.entries(request)) {
        injectResource(res,props);
    }
}

export function injectResource(resource: string, props:LoadProps): void {
    // get access url from library
    let res = resources[resource];
    if (!res) {
        throw new Error("Could not find resource: " + resource);
    }
    let version = res.versions[props.version]; 
    let url = constructImportableUrl(res.host_config, version);

    // inject import
    injectImportElement(res.type, url, props);    
}


const ImportCreators: { [type:string]:(url:string,props:LoadProps)=>void } = {
    js: injectJsImport,
    // css: parseGithubStFile,
}

function injectImportElement(type:ResourceType, url: string, props: LoadProps) {
    return ImportCreators[type](url,props);
}

function injectJsImport(url:string,props:LoadProps) {
    let el = document.createElement("script");
    el.setAttribute("src",url)
    document.head.appendChild(el);
}