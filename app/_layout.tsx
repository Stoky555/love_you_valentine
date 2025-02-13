import Colors from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer"; // Import AudioPlayer

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Valentíhra",
        headerTitleAlign: "center", // Centers the text
        headerStyle: { backgroundColor: Colors.Pink }, // Background color
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
          color: "#fff", // White text
        },
        headerRight: () => <AudioPlayer />, // Add the AudioPlayer button to the right
      }}
    />
  );
}
