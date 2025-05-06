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
import strings from "../../../shared/localization/strings"; // Import strings
import {
  borderRadius,
  colors,
  fontSizes,
  shadows,
  spacing,
} from "../../../shared/utils/theme";

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
    }
  }, [budget]);

  const handleSave = async () => {
    if (!inputValue.trim()) {
      setError(strings.budgetInputErrorEmpty);
      return;
    }

    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount <= 0) {
      setError(strings.budgetInputErrorInvalid);
      return;
    }

    try {
      await setBudget(amount);
      setIsEditing(false);
      setError(null);

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
      setError(strings.budgetInputErrorSave);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>
        {isEditing ? strings.budgetInputSetTitle : strings.budgetInputViewTitle}
      </Text>
      {
        // Display the budget input field or the current budget amount based on
        //the editing state
      }
      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.dollarSign}>
              {strings.budgetInputDollarSign}
            </Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                setError(null);
              }}
              placeholder={strings.budgetInputPlaceholder}
              keyboardType="numeric"
              autoFocus
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>
              {strings.budgetInputSaveButton}
            </Text>
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
    borderRadius: borderRadius.medium,
    padding: spacing.large,
    marginBottom: spacing.medium,
    ...shadows.medium,
    position: "relative",
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.medium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.medium,
    height: 50,
    marginBottom: spacing.medium,
  },
  dollarSign: {
    fontSize: fontSizes.large,
    color: colors.textLight,
    marginRight: spacing.x_small,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.large,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.small,
    paddingVertical: spacing.medium,
    alignItems: "center",
  },
  buttonText: {
    color: colors.background,
    fontSize: fontSizes.medium,
    fontWeight: "600",
  },
  errorText: {
    color: colors.overBudget,
    fontSize: fontSizes.small,
    marginBottom: spacing.medium,
  },
  budgetDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.small,
  },
  budgetAmount: {
    fontSize: fontSizes.x_large,
    fontWeight: "700",
    color: colors.text,
  },
  editIconContainer: {
    marginLeft: spacing.small,
  },
});

export default BudgetInput;
