import ICONS, { IconName } from "@/assets/icons";

interface Props {
  name: IconName;
  size?: 16 | 18 | 20;
  className?: string;
}

const Icon = ({ size = 16, name, className }: Props) => {
  const SVG = ICONS[name];
  return <SVG height={size} width={size} className={className} />;
};
export default Icon;
