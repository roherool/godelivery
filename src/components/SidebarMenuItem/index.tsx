import CartIcon from "./cart.svg";
import ConfigIcon from "./config.svg";
import FavoriteIcon from "./favorite.svg";
import LogoutIcon from "./logout.svg";
import MenuIcon from "./menu.svg";
import OrderIcon from "./order.svg";

interface Props {
  color: string;
  label: string;
  icon: "cart" | "config" | "favorite" | "logout" | "menu" | "order";
  onClick: () => void;
  disabled?: boolean;
}

export function SidebarMenuItem({ color, label, icon, onClick, disabled }: Props) {
  return (
    <div
      className="font-normal text-base text-#647d8b py-4 flex items-center"
      onClick={onClick}
    >
      {icon === "cart" && <CartIcon color={color} />}
      {icon === "config" && <ConfigIcon color={color} />}
      {icon === "favorite" && <FavoriteIcon color={color} />}
      {icon === "logout" && <LogoutIcon color={color} />}
      {icon === "menu" && <MenuIcon color={color} />}
      {icon === "order" && <OrderIcon color={color} />}
      <span
        className={`ml-6 cursor-pointer ${disabled ? "line-through" : ""}`}
      >
        {label}
      </span >
    </div >
  );
}