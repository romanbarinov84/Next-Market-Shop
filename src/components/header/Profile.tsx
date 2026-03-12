import Image from 'next/image';
import Link from 'next/link';

const Profile = () => {
    const user = false;

    if(!user){
        return <Link href="/login" className='ml-6 w-10 xl:w-39 flex justify-between items-center gap-x-2 p-2 rounded text-white text-base bg-[#ff6633] hover:shadow-(--shadow-article) active:shadow-(--shadow-button-active) duration-330 '>
            <div>
                <p>Вхід</p>
            </div>
            <div>
                <p></p>
            </div>
        </Link>
    }
    return (
        <div className='ml-6 p-2 flex flex-1 justify-end items-center gap-4.5'>
            <Image
                src="/лого хедера/avatar.png"
                alt="avatar"
                width={50}
                height={50}
                className="object-contain min-w-10 min-h-10"
            />
            <p className='text-base hidden xl:block cursor-pointer gap-2.5'>Avatar</p>
            <button className='hidden xl:block cursor-pointer p-2.5 '>
                <Image
                src="/лого хедера/HeaderBtnArrow.svg"
                alt="avatar"
                width={16}
                height={16}
                className="object-contain min-w-4 min-h-4"
            />
            </button>
        </div>
    );
};

export default Profile;
