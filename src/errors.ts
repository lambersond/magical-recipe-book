export const ERRORS = {
  NOT_FOUND: {
    name: 'NotFoundError',
    message: (resource: string, id?: string) =>
      `${resource}${id ? ` with id ${id}` : ''} not found`,
    code: 404,
  },
  NO_CHARACTER_OR_ACCESS: {
    name: 'NoCharacterOrAccessError',
    message: () => 'Character not found or unauthorized',
    code: 404,
  },
} as const

export class NotFoundError extends Error {
  constructor(resource: string, id?: string) {
    super(ERRORS.NOT_FOUND.message(resource, id))
    this.name = ERRORS.NOT_FOUND.name
  }
}

export class NoCharacterOrAccessError extends Error {
  constructor() {
    super(ERRORS.NO_CHARACTER_OR_ACCESS.message())
    this.name = ERRORS.NO_CHARACTER_OR_ACCESS.name
  }
}
