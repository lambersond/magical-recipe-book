export type LinkSendingStoneFormProps = {
  onSubmit(token: string): Promise<void> | void
}
