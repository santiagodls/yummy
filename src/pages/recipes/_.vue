<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AppFooter from '@/components/AppFooter.vue'
import AppRecipeMeta from '@/components/AppRecipeMeta.vue'

const recipeImgs = require.context('@/assets/images/recipe-images', true)

const components = {
  AppFooter,
  AppRecipeMeta
}

@Component({ components })
export default class RecipePage extends Vue {
  recipe: Recipe | null = null

  mounted () {
    const recipePath = this.$route.params.pathMatch
    this.recipe = require(`@/assets/recipes/${recipePath}.md`)
  }

  private _computeRecipeImg () {
    return recipeImgs(`./${this.recipe!.attributes.image}`)
  }

  private _onGoBackClicked () {
    this.$router.back()
  }
}
</script>

<template lang="pug">
.recipe-slug.page
  i.go-back-button.el-icon-back(@click='_onGoBackClicked')

  main.recipe-wrapper(v-if='recipe')
    header.recipe-header
      h1.recipe-title {{ recipe.attributes.title }}
      AppRecipeMeta.recipe-meta(:recipe='recipe')

    img.recipe-img(v-if='recipe.attributes.image' :src='_computeRecipeImg()')

    .recipe-ingredients
      h3.title Ingredientes
      ul.list
        li.list-item(v-for='ingredient in recipe.attributes.ingredients')
          | {{ ingredient }}

    recipe.recipe(:is='recipe.vue.component')

  main.recipe-wrapper(v-else)

  AppFooter

</template>

<style lang="stylus" scoped>
.page
  display: flex;
  flex-direction: column;

.go-back-button
  padding-bottom: 0;
  &::before
    font-size: 2em;

.recipe-wrapper
  flex: 1;

.recipe-header,
.recipe /deep/ > *
  margin-bottom: 1em;

.recipe-title
  font-size: 2.5em;

.recipe-img
  width: 100%;

.recipe /deep/ ol
  padding-left: 1em;

.recipe-ingredients ul,
.recipe /deep/ ul
  padding-left: 1.2em;

.recipe-ingredients .title
.recipe /deep/ h1
  font-size: 1.5em;
  font-weight: bold;
  margin: 1em 0 .5em;
  line-height: 1;

.recipe-ingredients ul li
.recipe /deep/ ul li
  list-style: circle !important;

.recipe-ingredients
  margin-bottom: 2em;

</style>
