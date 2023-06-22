<template>
  <div class="bg-primary text-white col text-center text-h3">
    {{ date.toLocaleDateString() }}
  </div>
  <div class="bg-primary text-white col text-center text-h3">
    {{ date.toLocaleTimeString() }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: new Date()
    }
  },
  created () {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
}
</script>
