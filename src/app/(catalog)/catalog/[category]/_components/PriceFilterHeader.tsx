


const PriceFilterHeader = ({resetPriceFilter}:{resetPriceFilter:() => void}) => {
  return (
    <div>
         <div className="flex flex-row justify-between items-center">
                <p className="text-black text-base">Ціна</p>
                <button
                    type="button"
                    onClick={resetPriceFilter}
                    className="text-xs rounded bg-[#f3f2f1] h-8 p-2 cursor-pointer"
                >
                    Видалити
                </button>
            </div>
    </div>
  )
}

export default PriceFilterHeader