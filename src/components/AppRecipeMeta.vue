<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class AppRecipeMeta extends Vue {
  @Prop() recipe!: Recipe

  private _computeIngredientsLength (recipe: Recipe) {
    const length = recipe.attributes.ingredients?.length ?? 0
    return `${length} ${length === 1 ? 'ingrediente' : 'ingredientes'}`
  }
}
</script>

<template lang="pug">
.app-recipe-meta(v-if='recipe')
  span <i class='el-icon-time'/> {{ recipe.attributes.time }}
  span <i class='el-icon-odometer'/> {{ recipe.attributes.difficulty }}
  span <i class='el-icon-food'/> {{ _computeIngredientsLength(recipe) }}

.app-recipe-meta(v-else)

</template>

<style lang="stylus" scoped>
.app-recipe-meta
  display: flex;
  color: var(--color-info)
  > *
    margin-right: .5em;

</style>
