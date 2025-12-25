

function Footer() {
  return (
    <footer>
      <footer className="bg-zinc-900 text-zinc-300">
  <div className="
    mx-auto
    max-w-7xl
    px-4 sm:px-6 lg:px-8
    py-10
  ">
    <div className="
      flex flex-col gap-8
      md:flex-row md:items-center md:justify-between
    ">
      {/* Левая часть: лого + навигация */}
      <div className="
        flex flex-col gap-6
        md:flex-row md:items-center md:gap-10
      ">
        {/* Лого */}
        <div className="flex items-center gap-3">
          <div className="
            w-[30px] h-[30px]
            rounded-md
            bg-zinc-700
          " />
         
        </div>

        {/* Навигация */}
        <nav className="
          flex flex-wrap gap-x-6 gap-y-2
          text-sm
        ">
          <a href="#" className="hover:text-white transition">
            Про компанію
          </a>
          <a href="#" className="hover:text-white transition">
            Контакти
          </a>
          <a href="#" className="hover:text-white transition">
            Вакансії
          </a>
          <a href="#" className="hover:text-white transition">
            Статті
          </a>
        </nav>
      </div>

      {/* Правая часть: соцсети + телефон */}
      <div className="
        flex flex-col gap-4
        md:items-end
      ">
        {/* Соцсети */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="VK"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              bg-zinc-800
              hover:bg-zinc-700
              transition
            "
          >
            VK
          </a>

          <a
            href="#"
            aria-label="Telegram"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              bg-zinc-800
              hover:bg-zinc-700
              transition
            "
          >
            TG
          </a>
        </div>

        {/* Телефон */}
        <a
          href="tel:+380000000000"
          className="text-sm text-zinc-300 hover:text-white transition"
        >
          +38 (000) 000-00-00
        </a>
      </div>
    </div>

    {/* Нижняя линия */}
    <div className="
      mt-10
      border-t border-zinc-800
      pt-6
      flex flex-col gap-2
      sm:flex-row sm:items-center sm:justify-between
      text-xs text-zinc-500
    ">
      <span>© {new Date().getFullYear()} Усі права захищені</span>
      <span>
        Design by <span className="text-zinc-300">Brinov Roman</span>
      </span>
    </div>
  </div>
</footer>

    </footer>
  )
}

export default Footer

