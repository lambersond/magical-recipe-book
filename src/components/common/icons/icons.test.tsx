import { render } from '@test-utils'
import { AccountIcon } from './account'
import { AddIcon } from './add'
import { ArrowDownIcon } from './arrow-down'
import { CheckIcon } from './check'
import { CheckboxIcon } from './checkbox'
import { CheckboxBlankIcon } from './checkbox-blank'
import { ChevronLeftIcon } from './chevron-left'
import { ChevronRightIcon } from './chevron-right'
import { ClockIcon } from './clock'
import { CloseIcon } from './close'
import { CogIcon } from './cog'
import { DeleteIcon } from './delete'
import { EditIcon } from './edit'
import { FileUploadIcon } from './file-upload'
import { LaunchIcon } from './launch'
import { LoginIcon } from './login'
import { LogoutIcon } from './logout'
import { MailIcon } from './mail'
import { MoreVertIcon } from './more-vert'
import { NewIcon } from './new'
import { SaveIcon } from './save'

describe('components/common/icons', () => {
  it.each([
    ['AccountIcon', AccountIcon],
    ['AddIcon', AddIcon],
    ['ArrowDownIcon', ArrowDownIcon],
    ['CheckIcon', CheckIcon],
    ['CheckboxBlankIcon', CheckboxBlankIcon],
    ['CheckboxIcon', CheckboxIcon],
    ['ChevronLeftIcon', ChevronLeftIcon],
    ['ChevronRightIcon', ChevronRightIcon],
    ['ClockIcon', ClockIcon],
    ['CloseIcon', CloseIcon],
    ['CogIcon', CogIcon],
    ['DeleteIcon', DeleteIcon],
    ['EditIcon', EditIcon],
    ['FileUploadIcon', FileUploadIcon],
    ['LaunchIcon', LaunchIcon],
    ['LoginIcon', LoginIcon],
    ['LogoutIcon', LogoutIcon],
    ['MailIcon', MailIcon],
    ['MoreVertIcon', MoreVertIcon],
    ['NewIcon', NewIcon],
    ['SaveIcon', SaveIcon],
  ])('should match snapshot - %s', (_name, Component) => {
    const { asFragment } = render(<Component />)

    expect(asFragment()).toMatchSnapshot()
  })
})
