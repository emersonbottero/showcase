import { createServer } from "miragejs"

const moduleMocks = import.meta.glob("@/modules/**/*.json", {eager: true})
const fixtures = {} as any
const urls:string[] = []
for (const path in moduleMocks) {
  const url = path.split("mocks")[1].replace("/index.json","").replaceAll("[",":").replaceAll("]","")
  //@ts-ignore
  const mocks = moduleMocks[path].default
  urls.push(url)
  if(Array.isArray(mocks)){
    fixtures[url.replace("/","")] = mocks
  }
}

console.log(fixtures);
console.log(urls);

const routerFactory = (server: any, urls: string[]) => urls.map(url => 
  !url.includes(":") ? 
    server.get(url,(schema:any) => schema.db[url.replace("/","")].where((x:any) => x)) 
  : server.get(url, (schema:any, request:any) => {
    const id = request.params[url.split(":")[1]]
    return schema.db[url.split("/")[1]].find(id)
  })
   )


export async function makeServer() {
  const server = createServer({

    fixtures,

    routes() {
      this.namespace = "api"

      routerFactory(this, urls)

      //Example of expected routes
      // this.get("/users", (schema) => schema.db['users'].where((x:any) => x))

      // this.get("/users/:id", (schema, request) => {
      //   const id = request.params['id']
      //   return schema.db['users'].find(id)
      // })
    },
  })

  return server
}