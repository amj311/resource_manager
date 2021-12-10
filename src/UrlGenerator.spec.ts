import { GithubConfig, GithubVersion, Host } from "./ResourceModels";
import constructImportableUrl from "./UrlGenerator";

describe(constructImportableUrl, ()=>{
    describe("GH_RAW",()=>{
        it("should construct github raw content url", ()=>{
            let config:GithubConfig = {
                host: Host.GH_RAW,
                user: "amj311",
                repo: "oliver-test",
                path: "src/Assertions.js"
            }
            let data: GithubVersion = {
                commitish: "174f5e4"
            } 
            let url = constructImportableUrl(config,data);
            expect(url).toBe("https://raw.githubusercontent.com/amj311/oliver-test/174f5e4/src/Assertions.js")
        })
    })
})