<template>
  <div id="app" class="container">
    <todos v-model="todos"></todos>
  </div>
</template>

<script>
  import Todos from './components/Todos'

export default {
  name: 'app',
  data: function () {
    return {
      todos: [
                { name: 'Demo', status: true }
              ]
    }
  },
  components: { Todos }
}
</script>



<style lang="scss">

  @import "./assets/scss/main";

</style>
