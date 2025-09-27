import { useState } from "react";
import { View, Text, TextInput,ActivityIndicator, Button, StyleSheet } from "react-native";

const FormProduct = () => {
    // Membuat State
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState("Hitam");
    const [discountcode, setDiscountcode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [discountStatus, setDiscountStatus] = useState("");

    // handle Discount
    const handleApplyDiscount = () => {
        setIsLoading(true);
        setDiscountStatus("");
        setTimeout(() => {
            if (discountcode.toLowerCase() === "promo10") {
                setDiscountStatus("Diskon 10% berhasil diterapkan!");
            } else {
                setDiscountStatus("Kode diskon tidak valid.");
            }
            setIsLoading(false);
        },1500);
    };
    // Membuat function handle quantity
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pesan T-Shirt</Text>
            <View style={styles.row}>
                <Button title="-" onPress={handleDecrement} />
                <Text style={styles.quantity}>{quantity}</Text>
                <Button title="+" onPress={handleIncrement} />
                </View>
            <View style={styles.row}>
                <Text style={styles.label}>Varian:</Text>
                <Button title="Hitam" disabled={variant==="Hitam"} onPress={() => setVariant("Hitam")} />
                <Button title="Biru" disabled={variant==="Biru"} onPress={() => setVariant("Biru")} />
                    </View>
            <View style={styles.row}>
                <Text style={styles.label}>Kode Diskon:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Masukkan kode diskon"
                    value={discountcode}
                    onChangeText={setDiscountcode}  
                />
                <Button title="Apply" onPress={handleApplyDiscount} />
                </View>
            {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
            {discountStatus !== "" && <Text style={styles.discountStatus}>{discountStatus}</Text>}
            </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        width: 150,
        marginRight: 10,
        borderRadius: 4,
        fontSize: 16,
    },
    discountStatus: {
        marginTop: 10,
        fontSize: 16,
        color: "green",
    },
});
export default FormProduct;