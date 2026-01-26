
export default function CatalogLoading() {
return (
<div className="flex h-[60vh] w-full items-center justify-center">
<div className="flex flex-col items-center gap-4">
<div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
<p className="text-sm text-gray-500">Зачекайте завантаження каталогу…</p>
</div>
</div>
);
}