import { createServer, type Request } from "miragejs"

const moduleMocks = import.meta.glob("@/modules/**/*.json", {eager: true})
const requests:Function[] = []

for (const path in moduleMocks) {
  console.log(path);
  
  // * path with ? or ! are ignored by the mock server
  const url = path.split("mocks")[1].split("!")[0]
  const cleanURL = url.replace("/get.json","").replace("/post.json","").replace("/patch.json","").replace("/put.json","")

  //@ts-ignore
  const mock = moduleMocks[path].default
  console.log(path,mock);
   

  if(path.includes("get")){
    requests.push((server:any) => server.get(cleanURL, (schema: any, request: Request) => {

      // * If we found a parameter we try to replace the mock (the url here is the base, everything before ? )
      if(Object.keys(request.queryParams).length){
        // * Here based on the params we try to recreate the correct path to the mock json file, if there is several param the order matters!
        // * this one is considering one parameter but should be easy to consider several
        const parameterPath = path.replace("get.json","!" + Object.keys(request.queryParams)[0] + "=" +  Object.values(request.queryParams)[0]) + "/get.json"
        //@ts-ignore
        const parameterMock = moduleMocks[parameterPath]?.default ?? ({error: "mock not found!"})
        return parameterMock
      }
      else
        return mock
    }))
    
  }
  else if(path.includes("post.json")){
    // * If we  have params in post we should replicated the logic here
    requests.push((server:any) => server.post(cleanURL, () =>  mock))
  }
  else if(path.includes("patch.json")){
    requests.push((server:any) => server.patch(cleanURL, () =>  mock))
  }
  else if(path.includes("put.json")){
    requests.push((server:any) => server.put(cleanURL, () =>  mock))
  }
  else if(path.includes("del.json")){
    requests.push((server:any) => server.del(cleanURL, () =>  mock))
  }
}
console.log(requests);

export async function makeServer() {
  const server = createServer({

    // fixtures,
    routes() {
      this.namespace = "api"
      requests.forEach(f => f(this)) 
    },
  })  

  return server
}