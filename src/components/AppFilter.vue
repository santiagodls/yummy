<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'nuxt-property-decorator'
import { Tag as ElTag, Radio as ElRadio, RadioGroup as ElRadioGroup } from 'element-ui'

export type Option = string

const components = {
  ElTag,
  ElRadio,
  ElRadioGroup
}

@Component({ components })
export default class AppFilter extends Vue {
  @Prop({ type: Array, required: true }) options!: Option[]
  @Model('value-changed', { type: String, required: true }) value!: Option

  innerValue: Option = ''
  optionsAreActive = false

  closeOptions () {
    this.optionsAreActive = false
  }

  /**
   * Event handlers
   */
  @Watch('value', { immediate: true })
  private _onValueChanged (value: Option) {
    this.innerValue = value
  }

  @Watch('innerValue', { immediate: true })
  private _oninnerValueChanged () {
    this.closeOptions()
    this.$emit('value-changed', this.innerValue)
  }

  private _onValueWrapperClicked () {
    this.optionsAreActive = !this.optionsAreActive
  }

  private _onOverlayClicked () {
    this.closeOptions()
  }
}
</script>

<template lang="pug">
.app-filter
  ElTag.tag(
    size='small'
    @click='_onValueWrapperClicked'
  )
    span.value-wrapper
      i.el-icon-set-up &nbsp;
      b {{ innerValue }}

  .options(v-show='optionsAreActive')
    ElRadioGroup.radio-group(v-model='innerValue')
      ElRadio(
        v-for='option, index in options'
        :label='option'
        :key='index'
      )

  .overlay(
    v-show='optionsAreActive'
    @click='_onOverlayClicked'
  )

</template>

<style lang="stylus" scoped>
.value-wrapper
  display: flex;
  align-items: center;

.options
  position: fixed;
  bottom: 0; left: 0;
  width: 100%;
  z-index: 100;

  background: white;
  padding: 2em;
  box-shadow: 1px 0 0 #444;

  animation: options-entry-animation .35s ease-out forwards
  margin-bottom: -100%;

.radio-group
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  > *:not(:last-child)
    margin-bottom: 1em;

.overlay
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 99;

  background: black;

  animation: overlay-entry-animation .25s ease-in forwards
  opacity: 0;

@keyframes options-entry-animation
  to
    margin-bottom: 0;

@keyframes overlay-entry-animation
  to
    opacity: .6;

</style>
