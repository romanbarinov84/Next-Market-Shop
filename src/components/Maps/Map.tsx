


const Map = () => {
  return (
    <section className="
  mt-16 sm:mt-20 lg:mt-24
  mb-16 sm:mb-20 lg:mb-24
   bg-zinc-50
  shadow-2xl rounded-2xl p-5
">
  <div className="
    mx-auto
    max-w-7xl
    px-4 sm:px-6 lg:px-8
  ">
    <div className="
      grid grid-cols-1 lg:grid-cols-2
      gap-6 lg:gap-10
      items-center
    ">
      {/* Текст */}
      <div>
        <h2 className="
          text-xl sm:text-2xl lg:text-3xl
          font-semibold
          text-zinc-900
          mb-4
        ">
          Наші магазини
        </h2>

        <p className="
          text-sm sm:text-base
          text-zinc-600
          leading-relaxed
          mb-6
        ">
          Завітайте до наших фізичних магазинів або знайдіть найближчу
          точку продажу у вашому місті.
        </p>

        <button className="
          rounded-xl
          bg-zinc-900
          px-6 py-3
          text-sm font-medium
          text-white
          transition
          hover:bg-zinc-800
        ">
          Знайти магазин
        </button>
      </div>

      {/* Карта */}
      <div className="
        overflow-hidden
        rounded-2xl
        border
        border-zinc-200
        shadow-md
        h-[260px] sm:h-[320px] lg:h-[380px]
      ">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps?q=Kyiv&output=embed"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

  )
}

export default Map