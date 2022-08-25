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
      className="justify-center p-6 text-base font-semibold text-center text-black border-black rounded"
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
