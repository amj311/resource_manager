import { GithubConfig, GithubVersion, Host, HostConfig, ResourceData, VersionData } from "./ResourceModels";

const HostHandlers: { [host:string]:(resource:ResourceData,tag:string)=>string } = {
    G_DRIVE: parseGoogleShareLink,
    GH_RAW: parseGithubStFile,
}

export default function constructImportableUrl(resource:ResourceData, versionTag: string) {
    return HostHandlers[resource.host_config.host](resource,versionTag);
}

function parseGoogleShareLink(props:any):string {
    return "shareUrl";
}

function parseGithubStFile(resource:ResourceData, tag:string):string {
    let {user, repo, path} = resource.host_config as GithubConfig;
    if (tag) tag = "@"+tag;
    return `https://cdn.jsdelivr.net/gh/${user}/${repo}${tag}/${path}`;
}

// https://docs.google.com/document/d/1kim0OY67DMvSxpLxaTEq7EpxwOJGfG8ssngctHW60hc/edit?usp=sharing
// 1kim0OY67DMvSxpLxaTEq7EpxwOJGfG8ssngctHW60hc
// https://drive.google.com/uc?export=download&id=1kim0OY67DMvSxpLxaTEq7EpxwOJGfG8ssngctHW60hc
