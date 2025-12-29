import Actions from '../components/actions/Actions';
import Articles from '../components/Articles/Articles';
import Map from '../components/Maps/Map';
import NewProducts from '../components/newProducts/NewProducts';
import Purchases from '../components/Purchases/Purchases';
import Slider from '../components/Slider/Slider';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers';

export default function Home() {
    return (
        <>
            <main className="flex flex-col w-full mx-auto ">
                <Slider />
                <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30 bg-white/10 p-5 m-5 rounded-xl shadow-2xl">
                 <div className='px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 nd:mb-25 xl:mb-30'>
                    <Actions />
                    <NewProducts/>
                    <Purchases/>
                    <SpecialOffers/>
                    <Map/>
                    <Articles/>
                 </div>
                    
                </div>
            </main>
        </>
    );
}
