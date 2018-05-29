import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
  all: {}, //all will hold all the conversations in the application.
  allIds: [], //allIds will be an array of conversation.id
  allMsgIds: [] //allMsgIds will be an array containing all the conversation.message ids
}

const mutations = {
    SET_CONVERSATION (state, { conversation }) {
        const data = conversation.data()
        state.all = {
          ...state.all, 
          [conversation.id]: { users: data.users, created: data.created, messages: [] }
        } 
        state.allIds.push(conversation.id)
      },
      ADD_MESSAGE (state, { conversationId, message }) {
        if (!state.allMsgIds.includes(message.id)) {
          state.all[conversationId].messages.push(message)
          state.allMsgIds.push(message.id)
        }
      }   
}

const actions = { 
  seed ({ rootState }) {
      
    let convoRef = rootState.db.collection('conversations')

    convoRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_b'],
      messages: [
        { id: uuidv4(), text: 'Hi there', sender: 'mr_a', created: Date.now() },
        { id: uuidv4(), text: 'Hi to you too!', sender: 'mr_b', created: Date.now() }
      ]
    })

    convoRef.add({
      created: Date.now(),
      users: ['mr_a', 'mr_c'],
      messages: []
    })
  },
  //Add a get() method to display the Firestore data in the Vue app.  
  //We will use the ES7 async/await syntax.
  //Calling get() on the collection returns a promise
  async get ({ commit, rootState }) {
    let convoRef = rootState.db.collection('conversations')
    let convos = await convoRef.get()

    convos.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
  },
  sendMessage ({ commit, rootState }, { text, created, sender, conversationId }) {
    const convoRef = rootState.db.collection('conversations').doc(conversationId)

    convoRef.update({
      messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
    })
    .then(res => console.log('Message sent.'))
    .catch(err => console.log('Error', err))
  }
}

export default { namespaced: true, state, mutations, actions }