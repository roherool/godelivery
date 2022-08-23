import MailSent from "./mailSent.svg"

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
    </div>
  )
}