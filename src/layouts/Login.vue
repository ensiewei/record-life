<template>
  <div class="q-pa-md">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >

      <q-input
        filled
        type="text"
        v-model="user.username"
        label="用户名 *"
        lazy-rules
        :rules="[
          val => val && val.length >= 4 && val.length <= 16 || '用户名长度应为4到16位'
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="user.password"
        label="密码 *"
        lazy-rules
        :rules="[ val => val && val.length >= 4 && val.length <= 16 || '密码长度应为6到16位' ]"
      />

      <div>
        <q-btn label="提交" type="submit" color="primary"/>
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="注册 >" color="green" flat class="q-ml-sm" to="register" />
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
        position: 'center',
        textColor: 'white',
        icon: 'cloud_done',
        message: '提交成功'
      })
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://49.234.30.114:12580/user/login',
        data: this.user
      }).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$q.cookies.set('token', res.data.token, { expires: '7d' })
          this.$q.notify({
            color: 'green-4',
            position: 'center',
            textColor: 'white',
            icon: 'cloud_done',
            message: '登录成功'
          })
          this.$router.go(-1)
        } else {
          this.$q.notify({
            color: 'red-5',
            position: 'center',
            textColor: 'white',
            icon: 'warning',
            message: res.data.msg
          })
        }
      }).catch(e => {
        console.log(e)
      })
    },
    onReset () {
      this.user = {}
    }
  }
}
</script>
