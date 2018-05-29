const state = {
    all: {},
    currentUser: 'mr_a' 
    //currentUser will simulate having someone logged in, and used to set the sender property on messages.
    //will be used later to set a sender field when when sending messages.
  }
  
  const mutations = {
    SET_USER (state, { user }) {
        state.all = {...state.all, [user.id]: user.data() }
      }
  }
  
  const actions = {
    seed ({ rootState }) {
      let userRef = rootState.db.collection('users')
      //db.collection('users') is part of the Firestore API. It returns a reference to the collection in the Firestore database. If it does not exist, it is created (or will be when you insert a document into it). Read more here: https://firebase.google.com/docs/firestore/data-model.
      userRef.doc('mr_a').set({
        firstName: 'Andy',
        lastName: 'Andyson'
      })
      //Firestore provides a set() method to add new data. 
      userRef.doc('mr_b').set({
        firstName: 'Ben',
        lastName: 'Benson'
      })
      userRef.doc('mr_c').set({
        firstName: 'Cee',
        lastName: 'Ceeson'
      })
    },
    async get ({ commit, rootState }) {
        let userRef = rootState.db.collection('users')
        let users = await userRef.get()
    
        users.forEach(user => commit('SET_USER', { user }))
      }
  }
  
  export default { 
    namespaced: true, state, mutations, actions
  }