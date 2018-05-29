<template>
  <div>
    <Initialize />
    <ConversationContainer 
      v-for="id in convoIds"
      :conversation="conversations[id]"
      :id="id"
      :key="id"
    />
  </div>  
    <!-- 
    We loop allIds, and pass each conversation as a prop to the ConversationContainer.vue
    We can use the id from Firestore as a :key for the v-for loop as a bonus. 
    -->
</template>

<script>
import Initialize from './Initialize.vue'
import ConversationContainer from './ConversationContainer.vue'
import { mapState } from 'vuex'

export default {
name: 'app',
  created () {
    console.log(this.$store.state.db)
  },
  components: {
    Initialize,
    ConversationContainer
  },
    computed: {
    ...mapState({
      conversations: state => state.conversations.all,
      convoIds: state => state.conversations.allIds
    })
    //The Vuex mapState helper function makes it easy to access the state.
  },
}
</script>

<style>
</style>