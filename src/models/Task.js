import mongoose from 'mongoose'

const taskSchema = {
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
}

export default mongoose.model('Task', taskSchema)
