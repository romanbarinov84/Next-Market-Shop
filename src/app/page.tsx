import Actions from '../components/actions/Actions';
import Slider from '../components/Slider/Slider';

export default function Home() {
    return (
        <>
            <main className="flex flex-col w-full mx-auto ">
                <Slider />
                <div className="px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 md:mb-25 xl:mb-30 bg-white/10 p-5 m-5 rounded-xl shadow-2xl">
                 <div className='px-[max(12px,calc((100%-1208px)/2))] flex flex-col gap-y-20 nd:mb-25 xl:mb-30'>
                    <Actions />
                 </div>
                    
                </div>
            </main>
        </>
    );
}
