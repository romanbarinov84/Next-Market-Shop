interface LoaderProps {
    text?: string;
    className?: string;
}

export default function GlobalLoader({ text = "" , className = "" }: LoaderProps) {
    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 z-50 gap-4 min-h-20 ${className}`}>
            <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
            {text && <p className="text-orange-600 font-medium">Завантаження {text}...</p>}
        </div>
    );
}