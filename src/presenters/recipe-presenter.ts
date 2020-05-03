const typesImgs = require.context('@/assets/images/recipe-types', false, /\.svg$/)
const recipeImgs = require.context('@/assets/images/recipe-images', true)

interface RecipePresenter extends RecipeAttributes {}

class RecipePresenter {
  constructor (public recipe: Recipe) {
    return new Proxy(this, {
      get (target, name) {
        if (name in recipe.attributes) {
          return recipe.attributes[name as keyof RecipeAttributes]
        }
        return target[name as keyof RecipePresenter]
      }
    })
  }

  get link () {
    const slug = this.recipe.meta.resourcePath.match(/.+recipes\/(.+?)\.md$/)
    return `/recipes/${slug?.[1] || ''}`
  }

  get typeImg () {
    if (typeof this.type === 'undefined') {
      window.console.warn(`Recipe ${this.recipe.meta.resourcePath} has no type defined`)
      return typesImgs('./main.svg')
    }
    return typesImgs(`./${this.type}.svg`)
  }

  get img () {
    return recipeImgs(`./${this.recipe!.attributes.image}`)
  }

  get ingredientsLength () {
    const length = this.recipe.attributes.ingredients?.length ?? 0
    return `${length} ${length === 1 ? 'ingrediente' : 'ingredientes'}`
  }
}

export default RecipePresenter
