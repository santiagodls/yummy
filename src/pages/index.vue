<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  get onChromePWA () {
    const isPWA = process.client && window.matchMedia('(display-mode: standalone)').matches
    const isChrome = process.client && navigator.userAgent.match(/Chrome/)
    return isPWA && isChrome
  }

  mounted () {
    // if is a chrome PWA then splash screen was displayed, so we aboid to introduce logo again
    if (this.onChromePWA) this.forward()
  }

  /**
   * Continue to next screen
   */
  forward () {
    this.$router.push('/recipes')
  }

  /**
   * Event handlers
   */
  private _onLogoAnimationEnd () {
    window.setTimeout(this.forward.bind(this), 2000)
  }
}
</script>

<template lang="pug">
.index.page
  img.logo(
    v-if='!onChromePWA'
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
