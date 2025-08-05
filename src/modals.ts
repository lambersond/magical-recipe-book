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
  ConfirmModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.ConfirmModal,
    })),
  ),
  EditCharacterModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.EditCharacterModal,
    })),
  ),
  FinishCookedDishModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.FinishCookedDishModal,
    })),
  ),
  GoForagingModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.GoForagingModal,
    })),
  ),
  PrepareRecipeModal: lazy(() =>
    import('./components/modals').then(module => ({
      default: module.PrepareRecipeModal,
    })),
  ),
}
