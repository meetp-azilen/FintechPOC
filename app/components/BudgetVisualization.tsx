import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import strings from "../localization/strings"; // Import strings
import {
  borderRadius,
  colors,
  fontSizes,
  shadows,
  spacing,
} from "../utils/theme";


interface BudgetVisualizationProps {
  totalExpenses: number;
  budget: number | null;
  budgetStatus: "under" | "over" | "none";
}

const BudgetVisualization: React.FC<BudgetVisualizationProps> = ({
  totalExpenses,
  budget,
  budgetStatus,
}) => {
  if (budgetStatus === "none") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{strings.budgetVisTitle}</Text>
        <View style={styles.noBudgetContainer}>
          <Text style={styles.noBudgetText}>
            {strings.budgetVisPromptSetBudget}
          </Text>
        </View>
      </View>
    );
  }

  const progress = budget ? (totalExpenses / budget) * 100 : 0;

  const progressColor =
    budgetStatus === "under" ? colors.underBudget : colors.overBudget;
  const statusText =
    budgetStatus === "under"
      ? strings.budgetVisStatusUnder
      : strings.budgetVisStatusOver;
  const remainingBudget = budget ? budget - totalExpenses : 0;
  const remainingText =
    remainingBudget >= 0
      ? `$${remainingBudget.toFixed(2)}${strings.budgetVisRemainingSuffix}`
      : `$${Math.abs(remainingBudget).toFixed(2)}${
          strings.budgetVisOverBudgetSuffix
        }`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.budgetVisTitle}</Text>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: progressColor }]}>
          {statusText}
        </Text>
        <Text style={styles.remainingText}>{remainingText}</Text>
      </View>

      {/* Circular Progress Bar */}
      <View style={styles.circularProgressContainer}>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={progress}
          tintColor={progressColor}
          backgroundColor={colors.secondary}
          rotation={0}
          lineCap="round"
          padding={10}
        >
          {(fill: number) => (
            <View style={styles.circularProgressContent}>
              <Text
                style={styles.progressPercentText}
                adjustsFontSizeToFit // Keep this prop if needed
              >{`${Math.round(fill)}${
                strings.budgetVisPercentageSymbol
              }`}</Text>
              <Text style={styles.progressSpentText}>
                {strings.budgetVisSpentLabel}
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.medium,
    padding: spacing.large,
    marginBottom: spacing.medium,
    ...shadows.medium,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.medium,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.medium,
  },
  statusText: {
    fontSize: fontSizes.large,
    fontWeight: "700",
  },
  remainingText: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
  },
  circularProgressContainer: {
    alignItems: "center",
    marginBottom: spacing.medium,
  },
  circularProgressContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  progressPercentText: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.text,
    alignContent: "center",
    textAlign: "center",
  },
  progressSpentText: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginTop: spacing.x_small,
  },
  noBudgetContainer: {
    padding: spacing.large,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.medium,
  },
  noBudgetText: {
    // Corrected style name
    fontSize: fontSizes.medium,
    color: colors.textLight,
    textAlign: "center",
  },
});

export default BudgetVisualization;
