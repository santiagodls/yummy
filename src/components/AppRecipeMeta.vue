<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import RecipePresenter from '@/presenters/recipe-presenter'

@Component
export default class AppRecipeMeta extends Vue {
  @Prop() recipe!: RecipePresenter
}
</script>

<template lang="pug">
.app-recipe-meta(v-if='recipe')
  span(v-if='recipe.time') <i class='el-icon-time'/> {{ recipe.time }}
  span(v-if='recipe.difficulty') <i class='el-icon-odometer'/> {{ recipe.difficulty }}
  span <i class='el-icon-food'/> {{ recipe.ingredientsLength }}
  span(v-if='recipe.servings') <i class='el-icon-dish'/> {{ recipe.servings }} raciones

.app-recipe-meta(v-else)

</template>

<style lang="stylus" scoped>
.app-recipe-meta
  display: flex;
  color: var(--color-info)
  > *
    margin-right: .5em;

</style>
