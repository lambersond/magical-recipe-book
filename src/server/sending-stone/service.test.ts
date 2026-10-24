/**
 * @jest-environment node
 */
/* eslint-disable unicorn/no-null */

import { linkCharacter, sendCookedDish } from './service'
import { prismaMock } from '@/utils/test-utils-node'

const SENT_AT = new Date('2026-10-24T12:00:00Z')

function cookedDish(overrides: Record<string, unknown> = {}) {
  return {
    id: 'dish-1',
    status: 'boon',
    cookedOnDay: 3,
    consumedOnDay: 3,
    sentAt: null,
    recipe: {
      name: 'Ember Stew',
      description: 'A warming stew.',
      boonText: 'The stew sings.',
      baneText: 'The stew sulks.',
      magicalIngredients: [
        {
          ingredient: {
            name: 'Snowmilk',
            boon: 'Resistance to cold damage.',
            bane: 'Vulnerability to cold damage.',
            boonChanges: [{ type: 'damageResistance', damageType: 'cold' }],
            baneChanges: [{ type: 'damageVulnerability', damageType: 'cold' }],
          },
        },
      ],
    },
    backpack: {
      character: {
        name: 'Thorin',
        settings: { sendingStoneToken: 'link-code' },
      },
    },
    ...overrides,
  }
}

const fetchMock = jest.fn()
const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status })

const send = () => sendCookedDish('character-1', 'dish-1', 'user-1')

describe('server/sending-stone/service', () => {
  const env = process.env

  beforeEach(() => {
    process.env = {
      ...env,
      SENDING_STONE_ENABLED: 'true',
      SENDING_STONE_URL: 'https://stone.example',
    }
    globalThis.fetch = fetchMock
    fetchMock.mockResolvedValue(answer(202, { id: 'queued-1' }))
    prismaMock.cookedDish.findFirst.mockResolvedValue(cookedDish() as any)
    prismaMock.cookedDish.updateMany.mockResolvedValue({ count: 1 })
    jest.useFakeTimers({
      now: SENT_AT,
      doNotFake: ['nextTick', 'setImmediate'],
    })
  })

  afterEach(() => {
    process.env = env
    jest.useRealTimers()
  })

  describe('sendCookedDish', () => {
    it.each([undefined, '', 'false', 'yes'])(
      'should send nothing while SENDING_STONE_ENABLED is %p',
      async value => {
        process.env.SENDING_STONE_ENABLED = value

        await expect(send()).resolves.toEqual({
          ok: false,
          status: 404,
          error: 'Sending dishes to Foundry isn’t turned on',
        })
        expect(prismaMock.cookedDish.findFirst).not.toHaveBeenCalled()
        expect(fetchMock).not.toHaveBeenCalled()
      },
    )

    it('should take SENDING_STONE_ENABLED in any case', async () => {
      process.env.SENDING_STONE_ENABLED = 'TRUE'

      await expect(send()).resolves.toMatchObject({ ok: true })
    })

    it('should need Sending Stone’s address', async () => {
      delete process.env.SENDING_STONE_URL

      await expect(send()).resolves.toMatchObject({ ok: false, status: 500 })
      expect(fetchMock).not.toHaveBeenCalled()
    })

    it('should look for the dish among the user’s character’s', async () => {
      await send()

      expect(prismaMock.cookedDish.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 'dish-1',
            backpack: {
              characterId: 'character-1',
              character: { userId: 'user-1' },
            },
          },
        }),
      )
    })

    it.each([
      ['no dish', null, 404, 'Dish not found'],
      [
        'a prepared dish',
        cookedDish({ status: 'prepared' }),
        409,
        'Finish cooking this dish before sending it',
      ],
      [
        'a character without a link',
        cookedDish({
          backpack: { character: { name: 'Thorin', settings: null } },
        }),
        409,
        'Link this character to Sending Stone first',
      ],
      [
        'a dish already sent',
        cookedDish({ sentAt: SENT_AT }),
        409,
        'This dish was already sent',
      ],
    ])('should refuse %s', async (_, found, status, error) => {
      prismaMock.cookedDish.findFirst.mockResolvedValue(found as any)

      await expect(send()).resolves.toEqual({ ok: false, status, error })
      expect(fetchMock).not.toHaveBeenCalled()
    })

    it('should send it to Sending Stone with the character’s link code', async () => {
      const outcome = await send()

      expect(fetchMock).toHaveBeenCalledWith(
        new URL('https://stone.example/api/cookbook/dishes'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer link-code',
          },
        }),
      )
      const body = JSON.parse(fetchMock.mock.calls[0][1].body)
      expect(body).toMatchObject({
        version: 1,
        dish: { id: 'dish-1', outcome: 'boon' },
        cook: { name: 'Thorin' },
        message: 'The stew sings.',
        effect: {
          name: 'Ember Stew (Boon)',
          changes: [{ type: 'damageResistance', damageType: 'cold' }],
        },
      })
      expect(outcome).toEqual({
        ok: true,
        result: { id: 'dish-1', sentAt: SENT_AT, dish: body },
      })
    })

    it('should mark the dish sent before sending it, only once', async () => {
      await send()

      expect(prismaMock.cookedDish.updateMany).toHaveBeenCalledWith({
        where: { id: 'dish-1', sentAt: null },
        data: { sentAt: SENT_AT },
      })
    })

    it('should refuse a dish another request sent meanwhile', async () => {
      prismaMock.cookedDish.updateMany.mockResolvedValue({ count: 0 })

      await expect(send()).resolves.toEqual({
        ok: false,
        status: 409,
        error: 'This dish was already sent',
      })
      expect(fetchMock).not.toHaveBeenCalled()
    })

    it.each([
      [
        401,
        undefined,
        'Sending Stone didn’t accept this character’s link. Link it again.',
      ],
      [404, undefined, 'Sending Stone doesn’t take dishes yet.'],
      [409, undefined, 'The game isn’t taking dishes right now.'],
      [500, undefined, 'Sending Stone couldn’t take this dish just now.'],
      [
        409,
        { reason: 'off', message: 'Dishes are off for this campaign' },
        'Dishes are off for this campaign',
      ],
    ])(
      'should unmark the dish and say why when Sending Stone answers %i',
      async (status, body, error) => {
        fetchMock.mockResolvedValue(answer(status, body))

        await expect(send()).resolves.toEqual({ ok: false, status: 502, error })
        expect(prismaMock.cookedDish.updateMany).toHaveBeenLastCalledWith({
          where: { id: 'dish-1', sentAt: SENT_AT },
          data: { sentAt: null },
        })
      },
    )

    it('should say so when Sending Stone can’t be reached', async () => {
      fetchMock.mockRejectedValue(new TypeError('fetch failed'))

      await expect(send()).resolves.toEqual({
        ok: false,
        status: 502,
        error: 'Couldn’t reach Sending Stone. Try again in a moment.',
      })
    })
  })

  describe('linkCharacter', () => {
    beforeEach(() => {
      prismaMock.character.findFirst.mockResolvedValue({
        id: 'character-1',
      } as any)
      prismaMock.characterSettings.upsert.mockImplementation(
        (args: any) =>
          ({ sendingStoneLinkedAt: args.update.sendingStoneLinkedAt }) as any,
      )
    })

    it('should link nothing while SENDING_STONE_ENABLED is off', async () => {
      delete process.env.SENDING_STONE_ENABLED

      await expect(
        linkCharacter('character-1', 'user-1', 'link-code'),
      ).resolves.toMatchObject({ ok: false, status: 404 })
      expect(prismaMock.characterSettings.upsert).not.toHaveBeenCalled()
    })

    it('should refuse another user’s character', async () => {
      prismaMock.character.findFirst.mockResolvedValue(null)

      await expect(
        linkCharacter('character-1', 'user-2', 'link-code'),
      ).resolves.toEqual({
        ok: false,
        status: 404,
        error: 'Character not found',
      })
      expect(prismaMock.character.findFirst).toHaveBeenCalledWith({
        where: { id: 'character-1', userId: 'user-2' },
        select: { id: true },
      })
      expect(prismaMock.characterSettings.upsert).not.toHaveBeenCalled()
    })

    it('should keep the link code and say when it was linked', async () => {
      await expect(
        linkCharacter('character-1', 'user-1', 'link-code'),
      ).resolves.toEqual({
        ok: true,
        result: { sendingStoneLinkedAt: SENT_AT },
      })
      expect(prismaMock.characterSettings.upsert).toHaveBeenCalledWith({
        where: { characterId: 'character-1' },
        update: {
          sendingStoneToken: 'link-code',
          sendingStoneLinkedAt: SENT_AT,
        },
        create: {
          characterId: 'character-1',
          sendingStoneToken: 'link-code',
          sendingStoneLinkedAt: SENT_AT,
        },
        select: { sendingStoneLinkedAt: true },
      })
    })

    it('should forget the link code when unlinked', async () => {
      await expect(
        linkCharacter('character-1', 'user-1', null),
      ).resolves.toEqual({ ok: true, result: { sendingStoneLinkedAt: null } })
      expect(prismaMock.characterSettings.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: { sendingStoneToken: null, sendingStoneLinkedAt: null },
        }),
      )
    })
  })
})
