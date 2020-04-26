<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { Input as ElInput, Icon as ElIcon } from 'element-ui'
import AppFooter from '@/components/AppFooter.vue'
import AppRecipeMeta from '@/components/AppRecipeMeta.vue'
import AppFilter from '@/components/AppFilter.vue'

export type RecipeTypeFilter = RecipeType | 'all'

const recipes = require.context('@/assets/recipes', true, /\.md$/)
const typesImgs = require.context('@/assets/images/recipe-types', false, /\.svg$/)

const components = {
  ElInput,
  ElIcon,
  AppFooter,
  AppRecipeMeta,
  AppFilter
}

export const recipeTypes: RecipeType[] = [
  'breakfast', 'main', 'dessert', 'snack'
]

@Component({ components })
export default class RecipesPage extends Vue {
  filter: RecipeTypeFilter = 'all'
  recipes: Recipe[] | null = null
  query = ''

  recipeTypesFilters: RecipeTypeFilter[] = [
    ...recipeTypes,
    'all'
  ]

  mounted () {
    const sessionFilter = window.sessionStorage.getItem('recipe-type-filter')
    if (sessionFilter) this.filter = sessionFilter as RecipeTypeFilter
    this.recipes = recipes.keys().map<Recipe>(recipes)
  }

  private _computeRecipeLink (recipe: Recipe) {
    const slug = recipe.meta.resourcePath.match(/.+recipes\/(.+?)\.md$/)
    return `/recipes/${slug?.[1] || ''}`
  }

  private _computeRecipeImg (recipe: Recipe) {
    return typesImgs(`./${recipe.attributes.type}.svg`)
  }

  /**
   * Event handlers
   */
  @Watch('query')
  @Watch('filter')
  private _onQueryOrFilterChanged () {
    this.recipes = recipes.keys().map<Recipe>(recipes)
      .filter((recipe) => {
        if (this.filter === 'all' || this.filter === recipe.attributes.type) {
          // https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
          const normalize = (string: string) => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // eslint-disable-line

          const title = normalize(recipe.attributes.title)
          const query = normalize(this.query)
          return title.match(new RegExp(query, 'i'))
        }
      })
  }

  @Watch('filter')
  private _onFilterChanged (filter: RecipeTypeFilter) {
    window.sessionStorage.setItem('recipe-type-filter', filter)
  }

  private _onInputChanged (input: string) {
    this.query = input
  }
}
</script>

<template lang="pug">
.recipes.page
  header.header: ElInput.searchbar(
    placeholder='Buscar una receta'
    prefix-icon='el-icon-search'
    v-model='query'
    @change='_onInputChanged'
    clearable
  )
    AppFilter(
      v-model='filter'
      :options='recipeTypesFilters'
      slot='suffix'
    )

  ul.recipes-list(v-if='recipes && recipes.length')
    nuxt-link.recipe(
      v-for='recipe, index in recipes'
      :to='_computeRecipeLink(recipe)'
      :key='index'
      tag='li'
    )
      .recipe-img
        img(:src='_computeRecipeImg(recipe)')
      .recipe-details
        h1.title {{ recipe.attributes.title }}
        AppRecipeMeta(:recipe='recipe')

  ul.recipes-list.empty(v-else)
    img.empty-img(src='@/assets/images/recipe.svg')
    h1.empty-msg No se encontraron recetas para tu búsqueda

  AppFooter

</template>

<style lang="stylus" scoped>
.page
  display: flex;
  flex-direction: column;

.header
  background: white;
  position: sticky;
  top: 0; left: 0;
  z-index: 1;

.recipes-list
  flex: 1;
  padding-top: 0;

.recipe
  display: flex;
  padding: .5em 0;

  &-img
    width: 3.5em;
    flex-shrink: 0;
    margin-right: 1em;
    position: relative;
    img
      width: 100%;

  &-details
    flex: 1;

.recipes-list.empty
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .empty-img
    width: 7em;
    margin: 0 0 1em 1.5em;

  .empty-msg
    text-align center;
    width: 10em;
    color: #151721;
    font-size: 1.2em;

.app-filter
  padding: .5em .25em;

</style>
