<template lang="html">
  <div>
    <div id="beepsWraper">
      <beep v-for="beep in beeps" :beep="beep"><beep>
    </div>
  </div>
</template>

<script>
import Beep from './Beep'

export default {
  name: 'BeepList',
  components: {
    beep: Beep
  },
  created() {
    this.beeps = [];
    this.getBeeps();
  },
  data() {
    return {
      beeps: []
    }
  },
  methods: {
    getBeeps() {
      this.$http.get('/beeps')
            .then((res) => {
              this.beeps = res.body.data;
            })
    }
  }
}
</script>

<style scoped>
  #beepWraper {
    margin: 0 -20px;
  }

  #beepsLoading {
    padding: 40px;
  }

  #beepsLoading i {
    font-size: 40px;
  }

</style>
