<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator'
import '@/assets/styles/theme.scss'

@Component
export default class DefaultLayout extends Vue {}

</script>

<template lang='pug'>
  nuxt

</template>

<style lang='stylus'>
html,
body,
#__nuxt,
#__layout
  width: 100%;
  height: 100%;

.page
  min-height: 100%;
  > *
    padding: 2em;

</style>
