import OrderHeader from './OrderHeader';

import DeliveryDatePicker from './DeliveryDatePicker';

import { useState } from 'react';

import OrderDetails from './OrderDetails';

import { StockWarningsAlert } from './StockWarningsAlert';
import OrderActions from './OrderActions';
import ProductsSection from '@/src/app/(products)/ProductsSection';
import MiniLoader from '@/src/components/MiniLoader';
import { useDeliveryData } from '@/src/hooks/useDeliveryData';
import useRepeatOrder from '@/src/hooks/useRepeatOrder';
import { useOrderProducts } from '@/src/hooks/useOrderProducts';
import { useOrderProductsData } from '@/src/hooks/useOrderProductsData';
import { Order } from '@/src/types/order';

const OrderCard = ({ order }: { order: Order }) => {
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const { productsData: fetchedProductsData, loading: productsDataLoading } =
        useOrderProductsData(order);

    const { orderProducts, stockWarnings } = useOrderProducts(
        order,
        fetchedProductsData,
    );

    const {
        showDatePicker,
        showDeliveryButton,
        handleOrderClick,
        handleDeliveryClick,
        handleDateSelect,
        handleCancelDelivery,
    } = useRepeatOrder();

    const { deliverySchedule } = useDeliveryData();

    const hasStockIssues = orderProducts.some(
        (product) => product.isLowStock || product.insufficientStock,
    );

    const applyIndexStyles = !showOrderDetails;

    if (productsDataLoading) {
        return <MiniLoader />;
    }

    return (
        <div className="text-main-text">
            <OrderHeader
                order={order}
                showDeliveryButton={showDeliveryButton}
                onOrderClick={handleOrderClick}
                onDeliveryClick={handleDeliveryClick}
                disabled={hasStockIssues}
            />
            <ProductsSection
                products={orderProducts}
                applyIndexStyles={applyIndexStyles}
                isOrderPage={true}
            />
            <StockWarningsAlert
                warnings={stockWarnings}
                hasStockIssues={hasStockIssues}
            />
            <OrderActions
                showOrderDetails={showOrderDetails}
                onToggleDetails={() => setShowOrderDetails(!showOrderDetails)}
            />
            {showOrderDetails && <OrderDetails order={order} />}
            {showDatePicker && (
                <DeliveryDatePicker
                    schedule={deliverySchedule}
                    isCreatingOrder={false}
                    onDateSelect={(date, timeSlot) =>
                        handleDateSelect(date, timeSlot, order.deliveryAddress)
                    }
                    onCancel={handleCancelDelivery}
                />
            )}
        </div>
    );
};

export default OrderCard;
