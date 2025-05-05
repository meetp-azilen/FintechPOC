import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Transaction } from "../api/transactionApi";
import { colors, fontSizes, spacing } from "../utils/theme";
import TransactionItem from "./TransactionItem";

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
    padding: spacing.large,
  },
  title: {
    fontSize: fontSizes.x_large,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.medium,
  },
  loadingText: {
    marginTop: spacing.medium,
    fontSize: fontSizes.medium,
    color: colors.textLight,
  },
  errorText: {
    fontSize: fontSizes.large,
    fontWeight: "600",
    color: colors.overBudget,
    marginBottom: spacing.small,
  },
  errorDescription: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
    textAlign: "center",
  },
  emptyContainer: {
    padding: spacing.x_large,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: fontSizes.medium,
    color: colors.textLight,
  },
  listContent: {
    paddingBottom: spacing.large,
  },
});

export default TransactionList;
