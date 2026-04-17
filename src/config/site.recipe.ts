import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'curation',
  themePack: 'curation-warm',
  homepageTemplate: 'article-home',
  navbarTemplate: 'editorial-bar',
  footerTemplate: 'columns-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'article',
  enabledTasks: ['article', 'profile'],
  taskTemplates: {
    article: 'article-journal',
    profile: 'profile-business',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
