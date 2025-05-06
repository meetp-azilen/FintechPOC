import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../../../shared/api/models/Transaction";
import { TransactionType } from "../../../shared/api/models/TransactionType";
import {
  borderRadius,
  colors,
  fontSizes,
  shadows,
  spacing,
} from "../../../shared/utils/theme";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { date, amount, type, category, description } = transaction;

  const isExpense = type === TransactionType.Expense;
  const amountColor = isExpense ? colors.expense : colors.income;
  const amountPrefix = isExpense ? "-" : "+";

  return (
    <View
      style={[
        styles.container,
        { borderLeftColor: isExpense ? colors.expense : colors.income },
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
    borderRadius: borderRadius.medium,
    padding: spacing.medium,
    marginBottom: spacing.medium,
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
    fontSize: fontSizes.medium,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.x_small,
  },
  description: {
    fontSize: fontSizes.small,
    color: colors.textLight,
    marginBottom: spacing.x_small,
  },
  date: {
    fontSize: fontSizes.x_small,
    color: colors.textLight,
  },
  amount: {
    fontSize: fontSizes.large,
    fontWeight: "700",
  },
});

export default TransactionItem;
