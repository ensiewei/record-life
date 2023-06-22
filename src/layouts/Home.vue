<template>
  <q-layout view="hHh lpR fFf">

    <q-header>
      <Header />
      <slot name="header"></slot>
    </q-header>

    <q-page-container>
      <slot name="container"></slot>
    </q-page-container>

    <q-footer>
      <slot name="footer"></slot>
      <Footer />
    </q-footer>

  </q-layout>
</template>

<script>
import Header from 'src/components/Header.vue'
import Footer from 'src/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
