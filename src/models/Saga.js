import mongoose from 'mongoose'

const sagaSchema = {
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Task',
    default: []
  }
}

export default mongoose.model('Saga', sagaSchema)
