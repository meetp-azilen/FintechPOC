import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../api/transactionApi";
import {
  borderRadius,
  colors,
  fontSizes,
  shadows,
  spacing,
} from "../utils/theme";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { date, amount, type, category, description } = transaction;

  const isExpense = type === "expense";
  const amountColor = isExpense ? colors.expense : colors.income;
  const amountPrefix = isExpense ? "-" : "+";

  return (
    <View
      style={[
        styles.container,
        { borderLeftColor: isExpense ? colors.expense : colors.income }, // Dynamic border color
      ]}
    >
      <View style={styles.leftContent}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.rightContent}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountPrefix}${amount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...shadows.small,
    borderLeftWidth: 4,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: "flex-end",
  },
  category: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSizes.sm,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: fontSizes.xs,
    color: colors.textLight,
  },
  amount: {
    fontSize: fontSizes.lg,
    fontWeight: "700",
  },
});

export default TransactionItem;
