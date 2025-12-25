
import React from 'react'

const SpecialOffers = () => {
  return (
    <section className="
  mt-12 sm:mt-16 lg:mt-20
  mb-16 sm:mb-10 lg:mb-14
  bg-zinc-50
  shadow-2xl rounded-2xl p-5">
  <div className="
    mx-auto
    max-w-7xl
    px-4 sm:px-6 lg:px-8
  ">
    {/* Заголовок секции */}
    <h2 className="
      mb-6 sm:mb-8
      text-xl sm:text-2xl lg:text-3xl
      font-semibold
      text-zinc-900
    ">
      Спеціальні пропозиції
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
  {/* Картка 1 — Оформіть картку */}
  <div className="
    relative
    flex flex-col
    rounded-2xl
    bg-gradient-to-br from-indigo-500 to-purple-600
    p-4 sm:p-5 lg:p-6
    text-white
    shadow-(--shadow-article)
    transition-transform duration-300
    hover:-translate-y-1
  ">
    <div className="text-xs sm:text-sm opacity-80 mb-2">
      Персональні переваги
    </div>

    <h3 className="
      text-lg sm:text-xl lg:text-2xl
      font-semibold
      mb-2 sm:mb-3
    ">
      Оформіть бонусну картку
    </h3>

    <p className="
      text-xs sm:text-sm
      opacity-90
      leading-relaxed
      mb-4 sm:mb-6
    ">
      Отримуйте кешбек, персональні знижки та доступ до спеціальних пропозицій
      для постійних клієнтів.
    </p>

    <button className="
      mt-auto
      w-full sm:w-auto
      rounded-xl
      bg-white
      px-4 sm:px-5
      py-2.5
      text-xs sm:text-sm
      font-medium
      text-indigo-600
      transition
      hover:bg-indigo-50
    ">
      Оформити картку
    </button>
  </div>

  {/* Картка 2 — Акційні товари */}
  <div className="
    relative
    flex flex-col
    rounded-2xl
    bg-white
    p-4 sm:p-5 lg:p-6
    border border-zinc-200
    shadow-(--shadow-article)
    transition-transform duration-300
    hover:-translate-y-1
  ">
    <span className="
      absolute top-3 right-3 sm:top-4 sm:right-4
      rounded-full
      bg-red-500
      px-2.5 sm:px-3
      py-1
      text-[10px] sm:text-xs
      font-semibold
      text-white
    ">
      -30%
    </span>

    <div className="text-xs sm:text-sm text-zinc-500 mb-2">
      Обмежена пропозиція
    </div>

    <h3 className="
      text-lg sm:text-xl lg:text-2xl
      font-semibold
      text-zinc-900
      mb-2 sm:mb-3
    ">
      Купуйте акційні товари
    </h3>

    <p className="
      text-xs sm:text-sm
      text-zinc-600
      leading-relaxed
      mb-4 sm:mb-6
    ">
      Найкращі пропозиції зі знижками — встигніть придбати товари за вигідною ціною
      вже сьогодні.
    </p>

    <button className="
      w-full sm:w-auto
      rounded-xl
      bg-zinc-900
      px-4 sm:px-5
      py-2.5
      text-xs sm:text-sm
      font-medium
      text-white
      transition
      hover:bg-zinc-800
    ">
      Переглянути акції
    </button>
  </div>
</div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
      {/* карточки из предыдущего сообщения */}
    </div>
  </div>
</section>

  )
}

export default SpecialOffers