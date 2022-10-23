import { Eye, EyeSlash } from 'phosphor-react'
import { useState } from 'react'

interface Props {
  color: string
  placeholder: string
  password?: boolean
  value: string
  onChange: (newValue: string) => void
}

export function InputField({
  color,
  placeholder,
  password,
  value,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  return (
    <div
      className="w-full h-[61px] border-2 rounded px-4 flex bg-gray-100"
      style={{
        borderColor: focused ? color : '#F9F9FB',
        backgroundColor: focused ? '#FFFFFF' : ''
      }}
    >
      <input
        className="flex-1 p-3 text-base font-normal bg-transparent border-0 outline-0 text-neutral-800"
        type={password ? (showPassword ? 'text' : 'password') : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        color={color}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {password && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center"
        >
          {showPassword && <Eye size={22} className="text-neutral-400" />}
          {!showPassword && <EyeSlash size={22} className="text-neutral-400" />}
        </div>
      )}
    </div>
  )
}
