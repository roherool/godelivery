interface Props {
  color: string
  label: string
  onClick: () => void
  fill?: boolean
}

export function Button({ color, label, onClick, fill }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center p-4 text-base font-semibold text-black border-2 border-black border-solid rounded"
      style={{
        backgroundColor: fill ? color : 'transparent',
        borderColor: color,
        color: fill ? '#FFF' : color,
      }}
    >
      {label}
    </div>
  )
}
