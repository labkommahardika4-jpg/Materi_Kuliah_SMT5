import { useReducer, useContext, createContext } from "react";

// 1. Membuat initial state dalam bentuk object
const initialState = {
    quantity: 1,
    variant: "Hitam",
    discountcode: "",
    isLoading: false,
    discountStatus: "",
    size: "M",
};
// 2. Semua Logika Bisnis di Reducer disatukan di sini
function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, quantity: state.quantity + 1 };
        case "DECREMENT":
            return { ...state, quantity: state.quantity > 1 ? state.quantity - 1 : 1 };
        case "SET_VARIANT":
            return { ...state, variant: action.payload };
        case "SET_DISCOUNT_CODE":
            return { ...state, discountcode: action.payload };
        case "APPLY_DISCOUNT":
            return { ...state, isLoading: true, discountStatus: "" };
        case "APPLY_DISCOUNT_SUCCESS":
            return { ...state, isLoading: false, discountStatus: "Diskon 10% berhasil diterapkan!" };
        case "APPLY_DISCOUNT_FAILURE":
            return { ...state, isLoading: false, discountStatus: "Kode diskon tidak valid." };
        default:
            return state;
    }
}
// 3. Membuat Context
const OrderContext = createContext();
// 4. Membuat Provider
export const OrderProvider = ({ children }) => {    
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <OrderContext.Provider value={{ state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
}
// 5. Membuat custom hook untuk menggunakan context
export const useOrder = () => {
const context = useContext(OrderContext);
if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
}
return context;
};