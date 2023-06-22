<template>
  <Home>
    <template v-slot:container>
      <div class="q-pa-md">
        <q-table
          class="my-sticky-dynamic"
          title="事件"
          :rows="rows"
          :columns="columns"
          selection="multiple"
          v-model:selected="selected"
          virtual-scroll
          hide-bottom
          :rows-per-page-options="[0]"
          @row-click="rowClick"
        />
      </div>
      <div class="text-center" v-if="user.id != undefined">
        <q-input v-if="isAdd" outlined v-model="name" label="名称" class="q-mb-sm q-ml-md q-mr-md" />
        <q-btn v-if="!isAdd" label="添加" color="green" class="q-mr-lg" @click="isAdd = true" />
        <q-btn v-else label="添加" color="primary" class="q-mr-lg" @click="addEvent" />
        <q-btn v-if="!isAdd && selected.length > 0" label="删除" color="red" class="q-ml-lg" @click="deleteClick" />
        <q-btn v-if="isAdd" label="取消" color="red" class="q-ml-lg" @click="isAdd = false" />
      </div>
    </template>
    <template v-slot:footer>
      <div v-if="user.id === undefined" class="bg-grey-5 text-center">
        <span>&emsp;你还没登录呢&emsp;</span>
        <q-btn to="login" color="green">去登陆 >></q-btn>
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
      columns: [
        { name: 'id', label: 'ID', field: row => row.id, align: 'left' },
        { name: 'name', label: '名称', field: row => row.name, align: 'left' }
      ],
      rows: [],
      selected: [],
      user: {
        id: undefined,
        username: undefined,
        password: undefined
      },
      isAdd: false,
      name: ''
    }
  },
  methods: {
    rowClick (evt, row, index) {
      this.$q.notify({
        color: 'primary',
        position: 'right',
        textColor: 'white',
        icon: 'warning',
        message: `记录 [ ${row.name} ] 吗？`,
        actions: [
          {
            label: '是的',
            color: 'green',
            handler: () => this.record(row)
          },
          {
            label: '按错了',
            color: 'red',
            handler: () => {
              this.$q.notify({
                color: 'primary',
                position: 'top',
                textColor: 'white',
                icon: 'cloud_done',
                message: '好吧'
              })
            }
          }
        ]
      })
    },
    record (row) {
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://49.234.30.114:12580/record/add',
        params: {
          token: this.$q.cookies.get('token'),
          eventId: row.id
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            textColor: 'white',
            icon: 'cloud_done',
            message: `记录 [ ${row.name} ] 成功！`
          })
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
    addEvent () {
      if (this.name.length === 0) {
        this.$q.notify({
          color: 'red-5',
          position: 'top',
          textColor: 'white',
          icon: 'warning',
          message: '名称不能为空'
        })
      } else {
        this.$axios({
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          url: 'http://49.234.30.114:12580/event/add',
          params: {
            token: this.$q.cookies.get('token'),
            name: this.name
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.$q.notify({
              color: 'primary',
              position: 'top',
              textColor: 'white',
              icon: 'cloud_done',
              message: `添加 [ ${this.name} ] 成功！`
            })
            setTimeout(() => {
              this.$router.go(0)
            }, 2000)
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
      }
    },
    deleteEvent () {
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://49.234.30.114:12580/event/delete',
        params: {
          token: this.$q.cookies.get('token')
        },
        data: this.selected.map((value) => value.id)
      }).then(res => {
        if (res.data.code === 0) {
          this.$q.notify({
            color: 'primary',
            position: 'top',
            textColor: 'white',
            icon: 'cloud_done',
            message: `删除 [ ${this.selected.map((value) => value.name).join(', ')} ] 成功！`
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
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
    deleteClick () {
      if (this.selected.length === 0) {
        this.$q.notify({
          color: 'red-5',
          position: 'top',
          textColor: 'white',
          icon: 'warning',
          message: '请选择要删除的项'
        })
      } else {
        this.$q.notify({
          color: 'primary',
          position: 'right',
          textColor: 'white',
          icon: 'warning',
          message: `确定要删除 [ ${this.selected.map((value) => value.name).join(', ')} ] 吗？`,
          actions: [
            {
              label: '是的',
              color: 'green',
              handler: () => this.deleteEvent()
            },
            {
              label: '按错了',
              color: 'red',
              handler: () => {
                this.$q.notify({
                  color: 'primary',
                  position: 'top',
                  textColor: 'white',
                  icon: 'cloud_done',
                  message: '好吧'
                })
              }
            }
          ]
        })
      }
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
      this.$axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: `http://49.234.30.114:12580/event/all?token=${token}`
      }).then(res => {
        if (res.data.code === 0) {
          this.rows = res.data.list
        } else {
          this.$q.cookies.remove('token')
        }
      })
    }
  }
}
</script>
