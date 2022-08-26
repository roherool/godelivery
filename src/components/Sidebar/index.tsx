import { Tenant } from "../../@types/Tenant";

import { useAuthContext } from "../../contexts/auth";

import { useRouter } from "next/router";
import { Power } from "phosphor-react";
import { Button } from "../Button";
import { SidebarMenuItem } from "../SidebarMenuItem";

interface Props {
  tenant: Tenant;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ tenant, open, onClose }: Props) {
  const { user, setToken } = useAuthContext();

  const router = useRouter();

  const handleLogout = () => {
    setToken("");
    onClose();
  }

  return (
    <div
      className="fixed top-0 bottom-0 right-0 z-50 w-0 overflow-hidden duration-300 ease-in bg-white"
      style={{ width: open ? "100vw" : "0" }}
    >
      <div className="flex flex-col w-screen h-full area">
        <div className="relative flex justify-between mx-6 mt-20 header">
          <div
            className="loginArea border-b-[1.5px] border-black ml-[42px] pb-12 min-w-[230px]"
            style={{ borderBottom: tenant.mainColor }}
          >
            {user &&
              <div className="text-base font-normal text-gray-500 userInfo">
                <strong className="block mt-2 text-2xl font-medium text-gray-900">
                  {user.name}
                </strong>
                Último pedido há X semanas
              </div>
            }
            {!user &&
              <Button
                color={tenant.mainColor}
                label="Fazer Login"
                onClick={() => router.push(`/${tenant.slug}/login`)}
                fill
              />
            }
          </div>

          <div
            className="flex items-start justify-end w-8 h-8 cursor-pointer closeBtn"
            onClick={onClose}
          >
            <Power size={32} color={tenant.mainColor} />
          </div>
        </div>
        <div className="divider border-b-[1.5px] border-gray-900 -mt-[1.5px] mx-6"></div>
        <div className="flex flex-col flex-1 px-16 py-6 menu">
          <SidebarMenuItem
            color={tenant.mainColor}
            icon="menu"
            label="Cardápio"
            onClick={() => router.push(`/${tenant.slug}/menu`)}
          />
          <SidebarMenuItem
            color={tenant.mainColor}
            icon="cart"
            label="Sacola"
            onClick={() => router.push(`/${tenant.slug}/cart`)}
          />
          <SidebarMenuItem
            color={tenant.mainColor}
            icon="favorite"
            label="Favoritos"
            onClick={() => { }}
            disabled
          />
          <SidebarMenuItem
            color={tenant.mainColor}
            icon="order"
            label="Meus Pedidos"
            onClick={() => router.push(`/${tenant.slug}/orders`)}
          />
          <SidebarMenuItem
            color={tenant.mainColor}
            icon="config"
            label="Configurações"
            onClick={() => { }}
            disabled
          />
        </div>
        <div className="flex flex-col px-16 py-6">
          {user &&
            <SidebarMenuItem
              color={tenant.mainColor}
              icon="logout"
              label="Sair"
              onClick={handleLogout}
            />
          }
        </div>
      </div>
    </div>
  );
}