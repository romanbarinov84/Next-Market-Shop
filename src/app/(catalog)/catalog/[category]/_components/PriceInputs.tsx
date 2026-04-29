
interface PriceInputsProps {
    from:string;
    to:string;
    min:number;
    max:number;
    onFromChangeAction:(value:string)=> void;
    onToChangeAction:(value:string)=>void;
}

const PriceInputs = ({onFromChangeAction,onToChangeAction,from,to,min,max}:PriceInputsProps) => {
  return (
    <div>
         <div className="flex flex-row mt-2 items-center justify-between  gap-2 ">
                <input
                    type="number"
                    name="from"
                    value={from}
                    onChange={(e)=>onFromChangeAction(e.target.value)}
                    min={min}
                    max={max}
                    className="w-30 px-2 py-1 bg-[#fefefe] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Від ${min}`}
                />
                <span className="text-gray-500 font-bold text-xl">-</span>
                <input
                    type="number"
                    name="to"
                    value={to}
                    onChange={(e) => onToChangeAction(e.target.value)}
                    min={min}
                    max={max}
                    className="w-30 px-2 py-1 bg-[#fefefe] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`До ${max}`}
                />
            </div>
    </div>
  )
}

export default PriceInputs