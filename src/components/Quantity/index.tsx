import { useEffect, useState } from "react";

import { useFormatter } from "../../libs/useFormatter";

interface Props {
  color: string;
  count: number;
  onUpdateCount: (newCount: number) => void;
  min?: number;
  max?: number;
  small?: boolean;
}

export function Quantity({ color, count, onUpdateCount, min, max, small }: Props) {
  const formatter = useFormatter();

  const [canRemove, setCanRemove] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  useEffect(() => {
    setCanRemove((!min || (min && count > min)) ? true : false);
    setCanAdd((!max || (max && count < max)) ? true : false)
  }, [count, min, max])

  const handleRemove = () => {
    if (canRemove) {
      onUpdateCount(count - 1)
    }
  }
  const handleAdd = () => {
    if (canAdd) {
      onUpdateCount(count + 1)
    }
  }

  return (
    <div className="flex items-center justify-center rounded border border-[#f2f4f5] overflow-hidden">
      <div
        className="flex items-center justify-center text-2xl font-bold cursor-pointer"
        onClick={handleRemove}
        style={{
          color: canRemove ? "#fff" : "#96a3ab",
          backgroundColor: canRemove ? color : "#f2f4f5",
          width: small ? 42 : 48,
          height: small ? 42 : 48
        }}
      >
        -
      </div>

      <div
        className="px-3 text-lg font-bold"
        style={{ fontSize: small ? 16 : 18 }}
      >
        {formatter.formatQuantity(count, 2)}
      </div>

      <div
        className="flex items-center justify-center text-2xl font-bold cursor-pointer"
        onClick={handleAdd}
        style={{
          color: canAdd ? "#fff" : "#96a3ab",
          backgroundColor: canAdd ? color : "#f2f4f5",
          width: small ? 42 : 48,
          height: small ? 42 : 48
        }}
      >
        +
      </div>
    </div>
  )
}