export enum ResourceType {
    JS = "js",
    CSS = "css"
}

export enum Host {
    GH_RAW = "GH_RAW",
    G_DRIVE = "G_DRIVE"
}

export type ResourceLib = { [key:string]: ResourceData }


export type ResourceData = {
    type: ResourceType,
    host_config : HostConfig,
    description? : string,
    versions?: { [version_key:string]: VersionData }
}

export class HostConfig {
    host!: Host;
}

export class GithubConfig extends HostConfig {
    user!: string;
    repo!: string;
    path!: string;
}

export interface VersionData {}

export class GithubVersion implements VersionData {
    commitish!: string;
}

// export class ResourceData {
//     constructor(public name: string, type: ResourceType, versions?: { version:string, url:string }[]) {
//         if (versions) {
//             this.versions = new VersionManager(...versions);
//         }
//     }
// }

// export class VersionManager {
//     /** Maps version codes to urls */
//     versions: Map<string,string> = new Map();
//     /** The most recent version added, used as fallback */
//     latest!: string;

//     constructor(...versions: { version:string, url:string }[]) {
//         if (versions.length>0) {
//             for (let pair of versions) {
//                 this.versions.set(pair.version, pair.url);
//             }
//             this.latest = versions.pop()?.version as any;
//         }
//     }

//     public newVersion(version:string,url:string) {
//         if (version === "latest") {
//             throw new Error("Version code cannot be 'latest'.")
//         }
//         this.versions.set(version,url);
//         this.latest = version;
//     }

//     public getVersion(version:string): string | undefined {
//         if (version === "latest") {
//             return this.getLatest();
//         }
//         return this.versions.get(version);
//     }
    
//     public getLatest(): string | undefined {
//         return this.versions.get(this.latest);
//     }
// }