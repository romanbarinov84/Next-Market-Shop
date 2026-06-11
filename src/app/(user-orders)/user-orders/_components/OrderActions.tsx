import IconVision from "@/src/components/svg/IconVision";

interface OrderActionsProps { 
    showOrderDetails:boolean;
    onToggleDetails:() => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({
    showOrderDetails,
    onToggleDetails,
}) => {
    
  return (
    <div className="flex justify-center mt-10">
        <button className="bg-[#f3f2f1] hover:shadow-button-secondary w-50 h-10 px-2 flex justify-center items-center " onClick={onToggleDetails}>
        <IconVision showPassword={!showOrderDetails}/>
        {showOrderDetails ? "Скрыть заказ" : "Посмотреть заказ"}
        </button>


    </div>
  )
}

export default OrderActions