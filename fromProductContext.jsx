import { useReducer } from "react";
import { View, Text, TextInput,ActivityIndicator, Button, StyleSheet } from "react-native";
import { useOrder } from "./hooks/orderContext";

const FormProductContext = () => {
    const { state, dispatch } = useOrder();

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

export default FormProductContext;