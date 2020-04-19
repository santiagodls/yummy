<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class AppFooter extends Vue {

}
</script>

<template lang="pug">
footer.app-footer
  img.logo(src='@/assets/images/logo.svg')
  span.reference
    | Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

</template>

<style lang="stylus" scoped>
.app-footer
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background: #f9fafb;

.logo
  width: 20vw;
  max-width: 10em;
  margin-bottom: 1em;

.reference
  color: #82929e;
  font-size: .8em;
  a
    font-size: 1em;
    color: inherit;
    text-decoration: none;
    font-weight: bold;

</style>
