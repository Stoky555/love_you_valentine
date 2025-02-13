import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import GameComponent from "@/components/Game";
import Colors from "@/constants/colors";

const App = () => {
  const [isGameVisible, setIsGameVisible] = useState(false);

  return (
    <View style={styles.container}>
      {isGameVisible ? (
        <GameComponent />
      ) : (
        <View style={styles.centerContent}>
          {/* Pink Text Box Above Button */}
          <View style={styles.textBox}>
            <Text style={styles.textBoxText}>Ahoj láska ❤️, vytvoril som ti k valentínu takúto maličkú hru, potrebuješ získať 30 bodov pre vyhratie hry. {'\n'}Dúfam, že ťa aspoň trošku poteší ❤️.</Text>
          </View>

          {/* Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setIsGameVisible(true)}
          >
            <Text style={styles.buttonText}>Zahraj si</Text>
          </TouchableOpacity>

          <View style={styles.textBox}>
            <Text style={styles.textBoxText}>V pravom hornom rohu je tlačidlo pre spustenie pesničky.</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Pink,
  },
  centerContent: {
    alignItems: "center", // Ensures both elements are centered
  },
  textBox: {
    backgroundColor: "rgba(121, 38, 255, 0.79)", // Pink with 80% opacity
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // Makes rounded edges
    marginBottom: 15, // Spacing between text and button
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  textBoxText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "rgb(255, 0, 0)",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20, // Adds spacing above and below the button
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
},
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default App;
