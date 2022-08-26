import CartIcon from "./cart.svg";
import ConfigIcon from "./config.svg";
import FavoriteIcon from "./favorite.svg";
import LogoutIcon from "./logout.svg";
import MailSent from "./mailSent.svg";
import MenuIcon from "./menu.svg";
import OrderIcon from "./order.svg";

interface Props {
  icon: string;
  color: string;
  width: number;
  height: number;
}

export const Icon = ({ icon, color, height, width }: Props) => {
  return (
    <div style={{ height, width }}>
      {icon === "mailSent" && <MailSent color={color} />}
      {icon === "cart" && <CartIcon color={color} />}
      {icon === "Config" && <ConfigIcon color={color} />}
      {icon === "favorite" && <FavoriteIcon color={color} />}
      {icon === "logout" && <LogoutIcon color={color} />}
      {icon === "menu" && <MenuIcon color={color} />}
      {icon === "order" && <OrderIcon color={color} />}
    </div>
  )
}