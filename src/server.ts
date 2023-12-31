import { createServer } from "miragejs"

const isDynamic = (url: string) => url.includes(":") || url.includes("[")

const moduleMocks = import.meta.glob("@/modules/**/*.json", {eager: true})
const fixtures = {} as any
const requests:Function[] = []

for (const path in moduleMocks) {
  const url = path.split("mocks")[1].replaceAll("[",":").replaceAll("]","") //.replace("/get.json","")
  const cleanURL = url.replace("/get.json","").replace("/post.json","").replace("/patch.json","").replace("/put.json","")

  //@ts-ignore
  const mocks = moduleMocks[path].default

  if(Array.isArray(mocks)){
    fixtures[cleanURL.replace("/","")] = mocks
  }

  if(path.includes("get")){
    if(isDynamic(path)){
      requests.push((server: any) => server.get(cleanURL, (schema:any, request:any) => {
        const id = request.params[cleanURL.split(":")[1]]
        return schema.db[cleanURL.split("/")[1]].find(id)
      }))
    }
    else{
      requests.push((server:any) => server.get(cleanURL,(schema:any) => schema.db[cleanURL.replace("/","")].where((x:any) => x)))
    }
  }
  else if(path.includes("post.json")){
    requests.push((server:any) => server.post(cleanURL, () => mocks))
  }
  else if(path.includes("patch.json")){
    requests.push((server:any) => server.patch(cleanURL, () => mocks))
  }
  else if(path.includes("put.json")){
    requests.push((server:any) => server.put(cleanURL, () => mocks))
  }
  else if(path.includes("del.json")){
    requests.push((server:any) => server.del(cleanURL, () => mocks))
  }
}

export async function makeServer() {
  const server = createServer({

    fixtures,

    routes() {
      this.namespace = "api"
      requests.forEach(f => f(this))
    },
  })

  return server
}