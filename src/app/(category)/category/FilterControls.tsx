import { FilterControlsProps } from "@/src/types/FilterControls";
import Link from "next/link";



const FilterControls = ({activeFilter,basePath,searchParams = {}}:FilterControlsProps) => {

    function buildClearFiltersLink(
  
    
){
    const params = new URLSearchParams();

    if(searchParams.page){
        params.set("page",searchParams.page);
    }
    if(searchParams.itemsPerPage){
        params.set("itemsPerPage",searchParams.itemsPerPage);
    }

    params.delete("filter");

    return `${basePath}?${params.toString()}`

}
  return (
     <div className=" hidden xl:flex flex-row flex-wrap gap-y-3 gap-x-6 mb-6">
                <div
                    className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-not-allowed gap-x-2 ${
                        !activeFilter || activeFilter.length === 0
                            ? 'bg-[#f3f2f1] text-[#606060]'
                            : 'bg-(--color-primary) text-white'
                    }`}
                >
                    {(() => {
                        const activeFilterCount = activeFilter
                            ? Array.isArray(activeFilter)
                                ? activeFilter.length
                                : 1
                            : 0;
                        return activeFilterCount === 0
                            ? 'Фільтри'
                            : activeFilterCount === 1
                              ? 'Фільтр 1'
                              : `Фільтри ${activeFilterCount}`;
                    })()}
                </div>
                <div
                    className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-not-allowed gap-x-2 ${
                        !activeFilter || activeFilter.length === 0
                            ? 'bg-[#f3f2f1] text-[#606060]'
                            : 'bg-(--color-primary) text-white'
                    }`}
                >
                    <Link href={buildClearFiltersLink()}>Очистити фільтри</Link> 
                   <button className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black rounded hover:bg-gray-300 active:bg-gray-400  duration-200 shadow-sm hover:shadow-md active:shadow-inner">
  X
</button>
                </div>
                <div
                    className={`h-8 p-2 text-xs flex justify-center items-center duration-300 cursor-not-allowed gap-x-2`}
                ></div>
            </div>
  )
}


export default FilterControls