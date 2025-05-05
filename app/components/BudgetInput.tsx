import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for an edit icon
import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  borderRadius,
  colors,
  fontSizes,
  shadows,
  spacing,
} from "../utils/theme";

interface BudgetInputProps {
  budget: number | null;
  setBudget: (amount: number) => Promise<void>;
}

const BudgetInput: React.FC<BudgetInputProps> = ({ budget, setBudget }) => {
  const [inputValue, setInputValue] = useState<string>(
    budget ? budget.toString() : "1500"
  );
  const [isEditing, setIsEditing] = useState<boolean>(budget === null);
  const [error, setError] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (budget !== null) {
      setInputValue(budget.toString());
      setIsEditing(false);
    } else {
      // Optional: Reset to default if budget becomes null externally
      // setInputValue("1500");
      // setIsEditing(true);
    }
  }, [budget]); 

  const handleSave = async () => {
    // Validate input
    if (!inputValue.trim()) {
      setError("Please enter a budget amount");
      return;
    }

    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid budget amount");
      return;
    }

    try {
      await setBudget(amount);
      setIsEditing(false);
      setError(null);

      // Add animation when budget is set
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      setError("Failed to save budget");
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{isEditing ? "Set Monthly Budget" : "Monthly Budget"}</Text>

      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                setError(null);
              }}
              placeholder="Enter budget amount"
              keyboardType="numeric"
              autoFocus
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Budget</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.budgetDisplay}>
            <Text style={styles.budgetAmount}>${budget?.toFixed(2)}</Text>
            {/* Edit Icon Button */}
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
    position: "relative", // Needed for absolute positioning of the icon
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    height: 50,
    marginBottom: spacing.md,
  },
  dollarSign: {
    fontSize: fontSizes.lg,
    color: colors.textLight,
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.lg,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  buttonText: {
    color: colors.background,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
  errorText: {
    color: colors.overBudget,
    fontSize: fontSizes.sm,
    marginBottom: spacing.md,
  },
  budgetDisplay: {
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "center", // Center items horizontally
    alignItems: "center",
    marginVertical: spacing.sm, // Adjust vertical margin if needed
  },
  budgetAmount: {
    fontSize: fontSizes.xl, // Slightly smaller to make space
    fontWeight: "700",
    color: colors.text,
  },
  editIconContainer: {
    // Remove absolute positioning
    marginLeft: spacing.sm, // Add space between amount and icon
  },
});

export default BudgetInput;
