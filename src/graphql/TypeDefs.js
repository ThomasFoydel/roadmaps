export const typeDefs = `#graphql
  type Roadmap {
    _id: String
    title: String!
    sagas: [Saga!]!
  }

  type Saga {
    _id: String
    title: String!
    tasks: [Task!]!
  }

  type Task {
    _id: String
    title: String!
    done: Boolean!
  }

  type Query {
    getAllRoadmaps: [Roadmap!]!
    getOneRoadmap(_id: String): Roadmap!
  }

  type Mutation {
    createRoadmap(title: String!): Roadmap!
    createSaga(title: String!, roadmap: String): Saga!
    createTask(title: String!, saga: String): Task!

    updateRoadmap(_id: String!, title: String): Roadmap!
    updateSaga(_id: String!, title: String): Saga!
    updateTask(_id: String!, done: Boolean, title: String): Task!
    
    deleteRoadmap(_id: String!): String!
    deleteSaga(_id: String!): String!
    deleteTask(_id: String!): String!
    
  }
`
