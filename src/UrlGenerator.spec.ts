import { GithubConfig, GithubVersion, Host, ResourceData, ResourceType } from "./ResourceModels";
import constructImportableUrl from "./UrlGenerator";

describe(constructImportableUrl, ()=>{
    describe("GH_RAW",()=>{
        it("should construct github raw content url", ()=>{
            let resource:ResourceData = {
                host_config: {
                    host: Host.GH_RAW,
                    user: "amj311",
                    repo: "oliver-test",
                    path: "src/Assertions.js"    
                } as GithubConfig,
                type: ResourceType.JS
            }
            let version = "174f5e4";
            let url = constructImportableUrl(resource,version);
            expect(url).toBe("https://cdn.jsdelivr.net/gh/amj311/oliver-test@174f5e4/src/Assertions.js")
        })
    })
})