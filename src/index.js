const { prisma } = require("./generated/prisma-client");
const Binding = require("prisma-binding");
const {GraphQLServer} = require("graphql-yoga")
const resolvers = require("./resolvers")
const {endpoint, origin, playground, secret } = require('./config')


/* const env = process.env
const endpoint = `${env.PRISMA_ENDPOINT}/${env.PRISMA_SERVICE}/${env.PRISMA_STAGE}`
 */


const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: (request) =>({
    ...request,
    db:new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint,
      secret
    }),
    prisma
  })
})


server.start({
  playground,
  cors:{
    origin
  }
}).then(()=> console.log('Server runnig on http://localhost:4000'))