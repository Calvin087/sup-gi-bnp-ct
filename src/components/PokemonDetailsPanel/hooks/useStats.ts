import { StatsType } from "@/types/pokemon";

const useStats = (statsArray: StatsType[]) => {
  const getStatValue = (name: string) => {
    const stat = statsArray.find((item) => item.stat.name === name);
    return stat ? stat.base_stat : null;
  };

  return {
    hp: getStatValue("hp"),
    attack: getStatValue("attack"),
    defense: getStatValue("defense"),
  };
};

export default useStats;
