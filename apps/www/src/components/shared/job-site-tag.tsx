import { Badge } from "../ui/badge";

const siteTagMap = {
  V2EX: {
    label: "V2EX",
    class: "bg-gradient-to-b from-black to-gray-800",
  },
  ELE_DUCK: {
    label: "电鸭",
    class: "bg-gradient-to-b from-orange-500 to-orange-400",
  },
  RUANYF: {
    label: "阮一峰",
    class: "bg-gradient-to-b from-blue-600 to-blue-500",
  },
};

export const JobSiteTag = ({ type }: { type: "V2EX" | "ELE_DUCK" | "RUANYF" }) => {
  const { label, class: cls } = siteTagMap[type];
  return <Badge className={cls}>{label}</Badge>;
};
