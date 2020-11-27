import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
import { MongoClient } from 'mongodb'

import {QueryResolvers} from './resolvers/QueryResolvers'
import {OrgResolvers} from './resolvers/OrgResolvers'
import {EventResolvers} from './resolvers/EventResolvers'
import {PositionResolvers} from './resolvers/PositionResolvers'

require('dotenv').config()

const typeDefs = gql`
  scalar Date

  type Query {
    getOrgs: [Org!]
    getEvents: [Event!]
    getPositions: [Position!]
    getOrgById(orgId: ID!): Org
    getEventById(eventId: ID!): Event
    getPositionById(posId: ID!): Position
  }

  type Org {
    orgId: ID!
    name: String
    description: String
    baseLocation: String
    events: [Event!]
  }

  type Event {
    eventId: ID!
    orgId: ID!
    eventName: String
    eventLoc: String
    startDate: Date
    endDate: Date
    positions: [Position!]
  } 

  type Position {
    posId: ID!
    eventId: ID!
    name: String
    destination: String
    startTime: Date
    endTime: Date
    filled: Boolean
    volunteer: String
  }
`

const resolvers = {
  Query: QueryResolvers,
  Org: OrgResolvers,
  Event: EventResolvers,
  Position: PositionResolvers

}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

let db;

const apolloServer = new ApolloServer({ 
    schema,
    context: async () => {
      if (!db) {
        try {
          const dbClient = new MongoClient( process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })

          if (!dbClient.isConnected()) await dbClient.connect()
          db = dbClient.db('volunteer_site')
        } catch (e) {
          console.log('--->error while connecting with graphql context (db)', e)
        }
      }
      return { db }
    }
 })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })