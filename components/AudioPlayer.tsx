import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const AudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/music/music.mp3"),
          { shouldPlay: false, isLooping: true }
        );
        setSound(sound);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading sound:", error);
        setIsLoading(false);
      }
    }

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const togglePlay = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync(); // Play on user interaction
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error toggling sound:", error);
      }
    }
  };

  return (
    <View style={styles.container}> {/* Wrap text in <Text> */}
      <TouchableOpacity 
        onPress={togglePlay} 
        style={styles.button} 
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : isPlaying ? "⏸ Pause" : "▶ Play"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginRight: 15, // Ensures spacing from the right side
    },
    button: {
      backgroundColor: "transparent", // Remove background color for header integration
      padding: 8, // Reduce padding
    },
    buttonText: {
      fontSize: 16, // Make text smaller
      fontWeight: "bold",
      color: "#fff", // Ensure white text in the header
    },
  });
export default AudioPlayer;

