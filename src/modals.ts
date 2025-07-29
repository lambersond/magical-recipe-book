import { lazy } from 'react'

export const MODALS = {
  AddCharacterModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.AddCharacterModal,
    })),
  ),
  AddCookbookRecipeModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.AddCookbookRecipeModal,
    })),
  ),
  CookRecipeModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.CookRecipeModal,
    })),
  ),
  EditCharacterModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.EditCharacterModal,
    })),
  ),
  ConfirmModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.ConfirmModal,
    })),
  ),
  GoForagingModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.GoForagingModal,
    })),
  ),
}
