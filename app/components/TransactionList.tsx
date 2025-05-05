import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Transaction } from "../api/transactionApi";
import TransactionItem from "./TransactionItem";
import { colors, spacing, fontSizes } from "../utils/theme";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  error,
  onRefresh,
}) => {
  if (isLoading && transactions.length === 0) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>Failed to load transactions</Text>
        <Text style={styles.errorDescription}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>

      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={[colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSizes.md,
    color: colors.textLight,
  },
  errorText: {
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.overBudget,
    marginBottom: spacing.sm,
  },
  errorDescription: {
    fontSize: fontSizes.md,
    color: colors.textLight,
    textAlign: "center",
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.textLight,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
});

export default TransactionList;
