export function Detail({
  label,
  detail,
  classNames = '',
}: Readonly<{ label: string; detail: string | number; classNames?: string }>) {
  return (
    <div className={classNames}>
      <p className='text-sm text-text-secondary'>{label}</p>
      <p className='text-text-primary mt-1'>{detail}</p>
    </div>
  )
}
