type RecipeType = 'breakfast' | 'main' | 'dessert' | 'snack'

interface RecipeAttributes {
  type: RecipeType
  title: string
  image: string
  time: string
  difficulty: string
  ingredients: string[]
}

interface RecipeMeta {
  resourcePath: string
}

interface RecipeVue {
  component: Vue
}

declare interface Recipe {
  attributes: RecipeAttributes
  meta: RecipeMeta
  vue: RecipeVue
}
