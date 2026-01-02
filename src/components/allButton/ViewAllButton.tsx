import Image from 'next/image';
import Link from 'next/link';

const ViewAllButton = ({ text , href}: { text: string, href:string }) => {
    return (
        <div>
            <Link
                href={href}
                className="inline-flex items-center gap-2 cursor-pointer"
            >
                <span className="text-base text-center text-[#606060] hover:text-[#bfbfbf] duration-300">
                    {text}
                </span>
                <Image
                    src="/ProductCard/arrow-Right.svg"
                    alt={text}
                    width={24}
                    height={24}
                    className="w-auto h-auto"
                />
            </Link>
        </div>
    );
};

export default ViewAllButton;
