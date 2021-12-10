import { GithubConfig, GithubVersion, Host, HostConfig, VersionData } from "./ResourceModels";

const HostHandlers: { [host:string]:(data:any,config?:any)=>string } = {
    G_DRIVE: parseGoogleShareLink,
    GH_RAW: parseGithubStFile,
}

export default function constructImportableUrl(config:HostConfig, versionData: VersionData) {
    return HostHandlers[config.host](versionData,config);
}

function parseGoogleShareLink(props:any):string {
    return "shareUrl";
}

function parseGithubStFile(version:GithubVersion, config:GithubConfig):string {
    return `https://cdn.jsdelivr.net/gh/${config.user}/${config.repo}/${config.path}`;
}

// https://docs.google.com/document/d/1kim0OY67DMvSxpLxaTEq7EpxwOJGfG8ssngctHW60hc/edit?usp=sharing
// 1kim0OY67DMvSxpLxaTEq7EpxwOJGfG8ssngctHW60hc
// https://drive.google.com/uc?export=download&id=1kim0OY67DMvSxpLxaTEq7EpxwOJGfG8ssngctHW60hc
