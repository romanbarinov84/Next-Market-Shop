import { getBonusesWord } from "@/UTILS/bonusWord";
import Image from "next/image";

const Bonuses = ({ bonus }: { bonus: number }) => {
  const roundedBonus = Math.round(bonus);
  const bonusWord = getBonusesWord(roundedBonus);

  return (
    <div className="w-53 flex flex-row gap-x-2 items-center justify-center mx-auto mb-2">
       <div className="relative w-6 h-6">
    <Image
      src="/favoriteIcon.png"
      alt="Бонусы"
      fill
      className="object-contain select-none"
    />
  </div>
      <p className="text-xs text-primary">
        Вы получаете{" "}
        <span className="font-bold">
          {roundedBonus} {bonusWord}
        </span>
      </p>
    </div>
  );
};

export default Bonuses;