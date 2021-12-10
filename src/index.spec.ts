import {injectResource} from ".";
import { GithubConfig, GithubVersion, Host } from "./ResourceModels";

describe(injectResource, ()=>{
    it("should inject oliver_assertions", ()=>{
        let resource = "oliver_assertions";
        let version = "174f5e4";
        let mockEl = {
            setAttribute: jest.fn()
        }
        document.createElement = jest.fn().mockReturnValue(mockEl);
        document.head.appendChild = jest.fn();
        injectResource(resource,version);
        expect(mockEl.setAttribute).toHaveBeenCalledWith("src","https://cdn.jsdelivr.net/gh/amj311/oliver-test@174f5e4/src/Assertions.js")
        expect(document.head.appendChild).toHaveBeenCalledWith(mockEl)
    })
})