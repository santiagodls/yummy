# yummy

> Wiki for yummy food 🥑🍍😋

## Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8000/yummy
$ npm run dev

```

## Upload a recipe

All recipes are **readed from `src/assets/recipes`** directory, and **only markdown files** will be loaded. The filenames will be treated as url slugs for /recipes route.

The folowing yml data should be included on frontmatter section of recipes:
```yml
type: RecipeType
title: string
image: string
time: string
difficulty: string
ingredients: string[]
```

More info about data types can be consulted on `src/types/data.d.ts` definitions.

### Important notes
* image indicated on frontmatter data should be stored under `src/assets/images/recipe-images/` directory
* selected type change list rendered images


## Deploy

``` bash
# generate static project
$ npm run generate

# deploy
$ npm run deploy

```
