<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  private _onLogoAnimationEnd () {
    window.setTimeout(() => {
      // redirect to recipes list 2 second after animation end
      this.$router.push('/recipes')
    }, 2000)
  }
}
</script>

<template lang="pug">
.index.page
  img.logo(
    src='@/assets/images/logo.svg'
    @animationend='_onLogoAnimationEnd'
  )

</template>

<style lang="stylus" scoped>
.index
  display: flex;
  justify-content: center;
  align-items: center;

.logo
  width: 60vw;
  max-width: 20em;

  animation: entry-animation 1s ease-in 1s forwards;
  opacity: 0;

@keyframes entry-animation
  to
    opacity: 1;

</style>
