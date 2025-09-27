import { useReducer } from "react";
import { View, Text, TextInput,ActivityIndicator, Button, StyleSheet } from "react-native";

// 1. Membuat initial state dalam bentuk object
const initialState = {
    quantity: 1,
    variant: "Hitam",
    discountcode: "",
    isLoading: false,
    discountStatus: "",
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
const FormProduct2 = () => {
    // 3. Gunakan useReducer untuk state management
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleApplyDiscount = () => {
        dispatch({ type: "APPLY_DISCOUNT" });
        setTimeout(() => {
            if (state.discountcode.toLowerCase() === "promo10") {
                dispatch({ type: "APPLY_DISCOUNT_SUCCESS" });
            }
            else {
                dispatch({ type: "APPLY_DISCOUNT_FAILURE" });
            }
        }, 1500);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pesan T-Shirt</Text>
            <View style={styles.row}>
                <Button title="-" onPress={() => dispatch({ type: "DECREMENT" })} />
                <Text style={styles.quantity}>{state.quantity}</Text>
                <Button title="+" onPress={() => dispatch({ type: "INCREMENT" })} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Varian:</Text>
                <Button title="Hitam" disabled={state.variant === "Hitam"} onPress={() => dispatch({ type: "SET_VARIANT", payload: "Hitam" })} />
                <Button title="Biru" disabled={state.variant === "Biru"} onPress={() => dispatch({ type: "SET_VARIANT", payload: "Biru" })} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Kode Diskon:</Text>
                <TextInput
                style={styles.input}
                    placeholder="Masukkan kode diskon"
                    value={state.discountcode}
                    onChangeText={(text) => dispatch({ type: "SET_DISCOUNT_CODE", payload: text })}
                />
                <Button title="Apply" onPress={handleApplyDiscount} />
            </View>
            {state.isLoading && <ActivityIndicator size="small" color="#0000ff" />}
            {state.discountStatus !== "" && <Text style={styles.discountStatus}>{state.discountStatus}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    quantity: {
        marginHorizontal: 8,
        fontSize: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
    },
});

export default FormProduct2;