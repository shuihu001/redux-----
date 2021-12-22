import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!',user: '0', date:"2021-12-22T03:52:40.884Z",reactions: {} },
  { id: '2', title: 'Second Post', content: 'More text', user: '1' , date:"2021-12-22T03:52:44.884Z", reactions: {} }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        Boolean(existingPost.reactions[reaction]) ? existingPost.reactions[reaction]++ : existingPost.reactions[reaction]=1 
      }
    },
    // postAdded(state, action) {
    //     state.push(action.payload)
    //   },
    postAdded: {
        reducer(state, action) {
          state.push(action.payload)
        },
        prepare(title, content, userId) {
          return {
            payload: {
              id: nanoid(),
              date: new Date().toISOString(),
              title,
              content,
              user: userId,
              reactions: {}
            }
          }
        }
      },
    postUpdated(state, action) {
        const {id, title, content} = action.payload
        const existingPost = state.find(post => post.id === id)
        if(existingPost) {
            existingPost.title = title;
            existingPost.content = content
        }
        },

  }
})

export const { postAdded, postUpdated, reactionAdded  } = postsSlice.actions
export default postsSlice.reducer