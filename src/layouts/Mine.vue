<template>
  <Home>
    <template v-slot:container>
      <div class="q-pa-md">
        <q-btn-group spread>
          <q-btn v-if="user" color="primary" :label="user.username" icon="people" />
          <q-btn v-else color="primary" label="登录/注册" icon="people" @click="login" />
          <q-btn v-if="user" color="green" label="登出" icon="logout" @click="logout" />
        </q-btn-group>
      </div>
    </template>
  </Home>
</template>

<script>
import Home from 'layouts/Home.vue'

export default {
  components: {
    Home
  },
  data () {
    return {
      user: undefined
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$q.cookies.remove('token')
      this.$router.go(0)
    }
  },
  created () {
    const token = this.$q.cookies.get('token')
    if (token) {
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: `http://49.234.30.114:12580/user/authenticate?token=${token}`
      }).then(res => {
        if (res.data.code === 0) {
          this.user = res.data.user
        } else {
          this.$q.cookies.remove('token')
        }
      })
    }
  }
}
</script>
