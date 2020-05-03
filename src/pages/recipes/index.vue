<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { Input as ElInput, Icon as ElIcon } from 'element-ui'
import AppFooter from '@/components/AppFooter.vue'
import AppRecipeMeta from '@/components/AppRecipeMeta.vue'
import AppFilter from '@/components/AppFilter.vue'
import RecipePresenter from '@/presenters/recipe-presenter'

export type RecipeTypeFilter = RecipeType | 'all'

const recipes = require.context('@/assets/recipes', true, /\.md$/)

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
  recipes: RecipePresenter[] | null = null
  query = ''

  recipeTypesFilters: RecipeTypeFilter[] = [
    ...recipeTypes,
    'all'
  ]

  mounted () {
    const sessionFilter = window.sessionStorage.getItem('recipe-type-filter')
    if (sessionFilter) this.filter = sessionFilter as RecipeTypeFilter
    this.recipes = recipes.keys().map(key => new RecipePresenter(recipes(key)))
  }

  /**
   * Event handlers
   */
  @Watch('query')
  @Watch('filter')
  private _onQueryOrFilterChanged () {
    this.recipes = recipes.keys().map(key => new RecipePresenter(recipes(key)))
      .filter((recipe) => {
        if (this.filter === 'all' || this.filter === recipe.type) {
          // https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
          const normalize = (string: string) => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // eslint-disable-line

          const title = normalize(recipe.title)
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
      :to='recipe.link'
      :key='index'
      tag='li'
    )
      .recipe-img
        img(:src='recipe.typeImg')
      .recipe-details
        h1.title {{ recipe.title }}
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
