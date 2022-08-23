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
      className="flex items-center justify-center, border-black text-black font-semibold text-base rounded"
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
