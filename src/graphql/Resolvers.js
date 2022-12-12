import Roadmap from '../models/Roadmap.js'
import Saga from '../models/Saga.js'
import Task from '../models/Task.js'

export const resolvers = {
  Query: {
    getAllRoadmaps: async () =>
      Roadmap.find({}).populate({
        path: 'sagas',
        model: 'Saga',
        populate: {
          path: 'tasks',
          model: 'Task'
        }
      }),

    getOneRoadmap: async (_, { _id }) =>
      Roadmap.findById(_id).populate({
        path: 'sagas',
        model: 'Saga',
        populate: {
          path: 'tasks',
          model: 'Task'
        }
      })
  },

  Mutation: {
    createRoadmap: async (_, args) => Roadmap.create(args),
    createSaga: async (_, args) => {
      const newSaga = await Saga.create(args)
      await Roadmap.findOneAndUpdate(
        { _id: args.roadmap },
        { $push: { sagas: [newSaga._id] } }
      )
      return newSaga
    },
    createTask: async (_, args) => {
      const newTask = await Task.create({ ...args, done: false })
      await Saga.findOneAndUpdate(
        { _id: args.saga },
        { $push: { tasks: [newTask._id] } }
      )
      return newTask
    },

    updateRoadmap: async (_, args) =>
      Roadmap.findOneAndUpdate({ _id: args._id }, args, {
        new: true,
        populate: {
          path: 'sagas',
          model: 'Saga',
          populate: {
            path: 'tasks',
            model: 'Task'
          }
        }
      }),
    updateSaga: async (_, args) =>
      Saga.findOneAndUpdate({ _id: args._id }, args, {
        new: true,
        populate: { path: 'tasks' }
      }),
    updateTask: async (_, args) => {
      const saga = await Saga.findOne({ tasks: { $in: [args._id] } }).populate({
        path: 'tasks',
        model: 'Task'
      })
      const roadmap = await Roadmap.findOne({
        sagas: { $in: [saga._id] }
      }).populate({
        path: 'sagas',
        model: 'Saga',
        populate: {
          path: 'tasks',
          model: 'Task'
        }
      })
      const sagaIndex = roadmap.sagas.findIndex((s) => s._id.equals(saga._id))

      if (sagaIndex !== 0 && args.done === true) {
        const previousSagas = roadmap.sagas.slice(0, sagaIndex)
        const complete = previousSagas.every((saga) =>
          saga.tasks.every((task) => task.done)
        )
        if (!complete) {
          throw new Error('You must first complete all previous sagas')
        }
      }
      if (args.done === false) {
        const futureSagas = roadmap.sagas.slice(sagaIndex + 1)
        const incomplete = futureSagas.every((saga) =>
          saga.tasks.every((task) => !task.done)
        )
        if (!incomplete) {
          throw new Error('You must uncheck future saga tasks')
        }
      }
      return Task.findOneAndUpdate({ _id: args._id }, args, { new: true })
    },

    deleteRoadmap: async (_, args) => {
      const roadmap = await Roadmap.findById(args._id).populate({
        path: 'sagas',
        model: 'Saga',
        populate: {
          path: 'tasks',
          model: 'Task'
        }
      })
      await Promise.all(
        roadmap.sagas.map(async (saga) => {
          await Promise.all(
            saga.tasks.map(async (task) => Task.deleteOne({ _id: task._id }))
          )
          return Saga.deleteOne({ _id: saga._id })
        })
      )
      await Roadmap.deleteOne({ _id: args._id })
      return args._id
    },
    deleteSaga: async (_, args) => {
      const saga = await Saga.findOne({ _id: args._id }).populate({
        path: 'tasks',
        model: 'Task'
      })
      await Promise.all(
        saga.tasks.map(async (task) => Task.deleteOne({ _id: task._id }))
      )
      await Saga.deleteOne({ _id: args._id })
      return args._id
    },
    deleteTask: async (_, args) => {
      await Task.deleteOne({ _id: args._id })
      return args._id
    }
  }
}
