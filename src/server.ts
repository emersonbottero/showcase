import { createServer, Model, type Registry } from "miragejs"
import type { ModelDefinition } from "miragejs/-types";
import type Schema from "miragejs/orm/schema"

export type User = {
    name: string
}

const UserModel: ModelDefinition<User> = Model.extend({});

type AppRegistry = Registry<{ user: typeof UserModel }, { /* factories can be defined here */ }>
type AppSchema = Schema<AppRegistry>


export async function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: UserModel,
    },

    fixtures:{
        users: (await import("./users.json")).default as User[]
    },

    routes() {
      this.namespace = "api"

      this.get("/users", (schema:AppSchema) => schema.all('user').models)

      this.get("/users/:id", (schema:AppSchema, request) => {
        const id = request.params.id      
        return schema.db['users'].find(id)
      })
    },
  })

  return server
}