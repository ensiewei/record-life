<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="user.username"
        label="用户名 *"
        lazy-rules
        :rules="[ val => val && val.length >= 4 && val.length <= 16 || '用户名长度应为4到16位']"
      />

      <q-input
        filled
        type="password"
        v-model="user.password"
        label="密码 *"
        lazy-rules
        :rules="[ val => val && val.length >= 6 && val.length <= 16 || '密码长度应为6到16位']"
      />

      <q-input
        filled
        type="password"
        v-model="repassword"
        label="确认密码 *"
        lazy-rules
        :rules="[
          val => val && val.length >= 6 && val.length <= 16 || '密码长度应为6到16位',
          val => val === user.password || '两次输入的密码不一致'
        ]"
      />

      <div>
        <q-btn label="提交" type="submit" color="primary"/>
        <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      repassword: undefined,
      user: {}
    }
  },
  methods: {
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: '提交成功'
      })
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://49.234.30.114:12580/user/register',
        data: this.user
      }).then(res => {
        if (res.data.code === 0) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: '注册成功'
          })
          this.$router.go(-1)
        } else {
          this.$q.notify({
            color: 'red-5',
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
