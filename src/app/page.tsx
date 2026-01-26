import Actions from './(products)/action/Actions';
import Articles from './(articles)/Article/Articles';
import Map from '../components/Maps/Map';
import NewProducts from './(products)/newProducts/NewProducts';
import Purchases from './(user)/Purchase/Purchases';
import Slider from '../components/Slider/Slider';
import SpecialOffers from '../components/SpecialOffers/SpecialOffers';
import { Suspense } from 'react';
import GlobalLoader from '../components/loading/GlobalLoader';

export default function Home() {
    return (
        <>
            <main className="flex flex-col w-full mx-auto ">
                <Suspense fallback={<GlobalLoader text="слайдера" />}>
                    <Slider />
                </Suspense>

                <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30 bg-white/10 p-5 m-5 rounded-xl shadow-2xl">
                    <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 nd:mb-25 xl:mb-30">
                    {[
                        {component:<Actions /> , text:"акцій"},
                        {component:<NewProducts /> , text:"новинок"},
                        {component:<Purchases />, text:"покупок"},
                        {component:<SpecialOffers />, text:"спец пропозицій"},
                        {component:<Map />, text:"карт магазинів"},
                        {component:<Articles /> , text:"наших постів"},
                    ].map((item , index) => (
                        <Suspense key={index} fallback={<GlobalLoader text={item.text}/>}>
                            {item.component}
                        </Suspense>
                    ))}
                        
                        
                       
                        
                        
                        
                    </div>
                </div>
            </main>
        </>
    );
}
