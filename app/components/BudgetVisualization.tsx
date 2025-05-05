import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
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
        <Text style={styles.title}>Budget Status</Text>
        <View style={styles.noBudgetContainer}>
          <Text style={styles.noBudgetText}>
            Set a monthly budget to track your spending
          </Text>
        </View>
      </View>
    );
  }

  const progress = budget ? (totalExpenses / budget) * 100 : 0;

  const progressColor =
    budgetStatus === "under" ? colors.underBudget : colors.overBudget;
  const statusText = budgetStatus === "under" ? "Under Budget" : "Over Budget";
  const remainingBudget = budget ? budget - totalExpenses : 0;
  const remainingText =
    remainingBudget >= 0
      ? `$${remainingBudget.toFixed(2)} remaining`
      : `$${Math.abs(remainingBudget).toFixed(2)} over budget`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Status</Text>

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
                adjustsFontSizeToFit
              >{`${Math.round(fill)}%`}</Text>
              <Text style={styles.progressSpentText}>Spent</Text>
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
    fontSize: fontSizes.medium,
    color: colors.textLight,
    textAlign: "center",
  },
});

export default BudgetVisualization;
