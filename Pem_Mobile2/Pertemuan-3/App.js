import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FormProduct from './formProduct';
import { OrderProvider } from './hooks/orderContext';
import FormProductContext from './fromProductContext';
import FormProduct2 from './fromProduct2';
import FormProductContext2 from './fromProductContext2';
export default function App() {
  return (
    <OrderProvider>
      <View style={styles.container}>
        {/* <FormProduct /> */}
       {/* <FormProduct2 /> */}
       {/* <FormProductContext /> */}
       <FormProductContext2 />
      <StatusBar style="auto" />
    </View>
    </OrderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
