import CloseButton from "./CloseButton";



type AuthFormVariant = "register" | "default";

export const AuthFormLayout = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: AuthFormVariant;
}) => (
 <div className="absolute inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm min-h-screen text-[#333] py-10 px-4">
  <div
    className={`${
      variant === "register" ? "max-w-171" : "max-w-105"
    } relative bg-white backdrop-blur-lg rounded-2xl shadow-2xl max-h-[calc(100vh-80px)] w-full flex flex-col px-6`}
  >
    <CloseButton />
    <div className="pt-18 pb-10 overflow-y-auto flex-1">{children}</div>
  </div>
</div>
);