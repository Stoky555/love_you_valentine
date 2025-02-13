import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Heart from "@/components/Heart";
import Colors from "../constants/colors";

const messages = [
  "Wau, ide ti to skvele! 🚀",
  "Si úžasná! ✨",
  "Len tak ďalej! 👏",
  "Si šikovná! 🏆",
  "Paráda, pokračuj! 🔥",
  "Už ti nechýba veľa! 🏁",
  "Perfektné, len tak ďalej! 🌟",
  "Máš na to! 💪",
  "Si na správnej ceste! 🛤️",
  "Pokračuj, zvládneš to! 🌸",
  "Si hviezda! ⭐",
  "Nezastavuj sa, super! 🎯",
  "Wow, si fakt dobrá! 🎉",
  "Každým klikom si lepšia! 🥇",
  "Tvoje skóre rastie ako raketa! 🚀",
  "Ešte pár bodov a budeš najlepšia! 🏅",
  "Tvoj výkon je neskutočný! 🔥",
  "Fantastické! Len pokračuj! 💖",
  "Si nezastaviteľná! 💥",
  "Bravó! Pokračuj v skvelej práci! 🏆"
];

const WinGameScore = 30;
const StartDelayForHearts = 2000;
const StopDecrementingDelayForHearts = 1000;
const StepForDecrementation = 50;

const GameComponent = () => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; top: number; left: number }[]>([]);
  const [intervalDelay, setIntervalDelay] = useState(StartDelayForHearts);
  const [encouragingMessage, setEncouragingMessage] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [goldenHeartCount, setGoldenHeartCount] = useState(WinGameScore);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");

  const addHeart = () => {
    const newHeart = {
      id: Date.now(),
      top: Math.random() * 70 + 9.5,
      left: Math.random() * 60 + 20,
    };
    setHearts((prev) => [...prev, newHeart]);

    if (intervalDelay > StopDecrementingDelayForHearts) {
      setIntervalDelay((prevDelay) => prevDelay - StepForDecrementation);
    }
  };

  const handleGoldenHeartClick = () => {
    if (!isUnlocked) return; // Do nothing if locked

    setHearts([]); // Remove all hearts
    setFinalMessage("ĽÚBIM ŤA A DÚFAM, ŽE BUDEŠ MAŤ KRÁSNY DEŇ ❤️❤️❤️❤️❤️");
  };

  const handlePop = () => {
    setScore((prev) => {
      const newScore = prev + 1;

      // Show an encouraging message every 10 points
      if (newScore % 10 === 0) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        setEncouragingMessage(messages[randomIndex]);
      }

      return newScore;
    });

    setGoldenHeartCount((prev) => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setIsUnlocked(true);
      }
      return newCount > 0 ? newCount : 0;
    });
  };

  const handlePlayAgain = () => {
    setScore(0);
    setFinalMessage("");
    setGoldenHeartCount(WinGameScore);
    setIsUnlocked(false);
    setHearts([]);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      addHeart();
    }, intervalDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalDelay]);

  return (
    <View style={styles.container}>
      {/* If final message exists, show it and hide everything else */}
      {finalMessage ? (
        <>
          <Text style={styles.finalMessage}>{finalMessage}</Text>

          {/* Play Again Button */}
          <TouchableOpacity onPress={handlePlayAgain} style={styles.playAgainButton}>
            <Text style={styles.playAgainText}>🔄 Zahraj si znovu</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Top Section for Score & Messages */}
          <View style={styles.topContainer}>
            {encouragingMessage !== "" && (
              <Text style={styles.message}>{encouragingMessage}</Text>
            )}
            <Text style={styles.score}>Skóre: {score}</Text>
          </View>

          {/* Golden Heart Button */}
          <TouchableOpacity
            onPress={handleGoldenHeartClick}
            style={[styles.goldenHeart, { opacity: isUnlocked ? 1 : 0.5 }]}
          >
            <Text style={styles.heartText}>💖</Text>
            <Text style={styles.heartNumber}>{goldenHeartCount}</Text>
          </TouchableOpacity>

          {/* Hearts Falling */}
          {hearts.map((heart) => (
            <Heart
              key={heart.id}
              onPress={handlePop}
              style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
            />
          ))}
        </>
      )}
    </View>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start", // Align content at the top
    alignItems: "center",
    backgroundColor: Colors.Pink,
    paddingTop: 20, // Add some space from the top
  },
  topContainer: {
    position: "absolute",
    top: 10, // Place at the top
    left: 0,
    right: 0,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.White,
    marginBottom: 5,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.White,
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  score: {
    fontSize: 22,
    color: Colors.White,
    fontWeight: "bold",
    marginBottom: 5, // Small spacing
  },
  goldenHeart: {
    position: "absolute",
    left: 5, // Moves it more to the left
    top: "50%",
    transform: [{ translateY: -50 }],
    backgroundColor: "gold",
    paddingVertical: 8, // Reduce vertical padding
    paddingHorizontal: 1, // Reduce horizontal padding (makes it thinner)
    borderRadius: 40, // Keeps the rounded look but thinner
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  heartText: {
    fontSize: 30, // Make the heart bigger
    fontWeight: "bold",
    color: "#fff",
  },
  heartNumber: {
    fontSize: 18, // Slightly smaller for a clear distinction
    fontWeight: "bold",
    color: Colors.Black,
    marginTop: 5, // Space between the heart and the number
  },
  finalMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  playAgainButton: {
    position: "absolute",
    bottom: 50, // Position at the bottom
    alignSelf: "center", // Center it horizontally
    backgroundColor: "#ff4081", // Vibrant pink button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  playAgainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default GameComponent;
