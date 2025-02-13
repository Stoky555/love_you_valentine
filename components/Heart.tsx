import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { Audio } from "expo-av";

interface HeartProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const messages = [
  "Tvoje oči sú ako dve hviezdy! ✨👀",
  "Si neskutočne sexy! 🔥",
  "Milujem tvoj úsmev! 😊❤️",
  "Si nádherná, nemôžem sa na teba vynadívať! 😍",
  "Tvoje vlasy sú úžasné! 💕💇‍♀️",
  "Si neuveriteľne inteligentná a múdra! 🧠💡",
  "Tvoja tvárička je na zjedenie! 🥰",
  "Mám rád, keď sa na mňa tak krásne pozeráš! 👀💕",
  "Zbožňujem tvoj pevný zadoček! 🍑🔥",
  "Si najkrajšia žena na svete! 🌎💖",
  "Milujem, ako voniaš! 🌸👃",
  "Si tak nežná a zároveň divoká! 🔥❤️",
  "Tvoje pery sú dokonale sladké! 💋🍭",
  "Zbožňujem tvoju pevnosť a silu! 💪🔥",
  "Tvoje telo je umelecké dielo! 🎨😍",
  "Každý tvoj pohyb ma fascinuje! 🔥👀",
  "Mám rád, ako sa ku mne túliš! 🤗❤️",
  "Si očarujúca a výnimočná! ✨🌟",
  "Tvoje ruky sú tak jemné a príjemné! 🤲💕",
  "Si ako magnet, stále ma k tebe ťahá! 🧲❤️",
  "Zbozňujem, že sa smejes mojim vtipom ❤️",
];

const Heart = ({ onPress, style }: HeartProps) => {
  const [popped, setPopped] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Function to play pop sound
  const playPopSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/pop.mp3") // Ensure this file exists in the correct path
      );

      await sound.setVolumeAsync(0.3); // Adjust volume (range: 0.0 - 1.0)
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handlePress = () => {
    playPopSound(); // Play pop sound on press

    scale.value = withTiming(0, { duration: 300, easing: Easing.ease }, () => {
      runOnJS(setPopped)(true);
      runOnJS(setShowMessage)(true);
      runOnJS(setRandomMessage)(messages[Math.floor(Math.random() * messages.length)]);

      // Start animation for text message
      translateY.value = withTiming(-50, { duration: 2000, easing: Easing.out(Easing.exp) });
      opacity.value = withTiming(0, { duration: 4000 }, () => {
        runOnJS(setShowMessage)(false);
      });

      onPress();
    });
  };

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (popped && !showMessage) return null;

  return (
    <View style={[styles.container, style]}>
      {!popped && (
        <TouchableOpacity onPress={handlePress} style={styles.heart}>
          <Animated.View style={[styles.heartContainer, animatedHeartStyle]}>
            <Text style={styles.heartText}>❤️</Text>
          </Animated.View>
        </TouchableOpacity>
      )}

      {showMessage && (
        <TouchableOpacity onPress={() => setShowMessage(false)}>
          <Animated.View style={[styles.messageContainer, animatedTextStyle]}>
            <Text style={styles.messageText}>{randomMessage}</Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  heart: {
    position: 'absolute',
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: {
    fontSize: 40,
  },
  messageContainer: {
    position: "absolute",
    top: "50%", // Moves the top of the box to the center
    left: "50%",
    transform: [{ translateX: -90 }, { translateY: -50 }], // Centers it fully
    zIndex: 9999, // Ensures it's on top
    elevation: 10, // Ensures visibility on Android
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 180, // Prevents it from being too thin
    maxWidth: "80%", // Prevents it from getting too wide
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black background
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    flexShrink: 1, // Ensures text doesn't overflow
    flexWrap: "wrap", // Allows text to break naturally
  },
});

export default Heart;
