import { gql } from '@apollo/client'

export const GET_ALL_ROADMAPS = gql`
  query GetAllRoadmaps {
    getAllRoadmaps {
      _id
      title
      sagas {
        _id
        title
        tasks {
          _id
          title
          done
        }
      }
    }
  }
`

export const CREATE_ROADMAP = gql`
  mutation CreateRoadMap($title: String!) {
    createRoadmap(title: $title) {
      _id
      title
      sagas {
        _id
        title
        tasks {
          _id
          title
          done
        }
      }
    }
  }
`

export const CREATE_SAGA = gql`
  mutation CreateSaga($title: String!, $roadmap: String!) {
    createSaga(title: $title, roadmap: $roadmap) {
      _id
      title
      tasks {
        _id
        title
        done
      }
    }
  }
`

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $saga: String!) {
    createTask(title: $title, saga: $saga) {
      _id
      title
      done
    }
  }
`

export const createMutations = {
  roadmap: CREATE_ROADMAP,
  saga: CREATE_SAGA,
  task: CREATE_TASK
}

export const DELETE_ROADMAP = gql`
  mutation DeleteRoadmap($_id: String!) {
    deleteRoadmap(_id: $_id)
  }
`
export const DELETE_SAGA = gql`
  mutation DeleteSaga($_id: String!) {
    deleteSaga(_id: $_id)
  }
`
export const DELETE_TASK = gql`
  mutation DeleteTask($_id: String!) {
    deleteTask(_id: $_id)
  }
`

export const UPDATE_ROADMAP = gql`
  mutation UpdateRoadmap($_id: String!, $title: String) {
    updateRoadmap(_id: $_id, title: $title) {
      _id
      title
      sagas {
        _id
        title
        tasks {
          _id
          title
          done
        }
      }
    }
  }
`

export const UPDATE_SAGA = gql`
  mutation UpdateSaga($_id: String!, $title: String) {
    updateSaga(_id: $_id, title: $title) {
      _id
      title
      tasks {
        _id
        title
        done
      }
    }
  }
`

export const UPDATE_TASK = gql`
  mutation UpdateTask($_id: String!, $title: String, $done: Boolean) {
    updateTask(_id: $_id, title: $title, done: $done) {
      _id
      title
      done
    }
  }
`
