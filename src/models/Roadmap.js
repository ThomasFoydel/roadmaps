import mongoose from 'mongoose'

const roadmapSchema = {
  title: {
    type: String,
    required: true
  },
  sagas: {
    type: [mongoose.Schema.Types.ObjectId],
    references: 'Saga',
    default: []
  }
}

export default mongoose.model('Roadmap', roadmapSchema)
