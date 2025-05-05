import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BudgetInput from "../components/BudgetInput";
import BudgetVisualization from "../components/BudgetVisualization";
import TransactionList from "../components/TransactionList";
import { useBudget } from "../hooks/useBudget";
import { useTransactions } from "../hooks/useTransactions";
import { colors, spacing } from "../utils/theme";

const HomeScreen: React.FC = () => {
  // Transactions hook
  const {
    transactions,
    isLoading,
    error,
    totalExpenses,
    totalIncome,
    refresh,
  } = useTransactions();

  // Budget hook
  const { budget, setBudgetAmount, getBudgetStatus } = useBudget();

  // Get budget status
  const budgetStatus = getBudgetStatus(totalExpenses);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Track your Finance</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <BudgetInput budget={budget} setBudget={setBudgetAmount} />

        <BudgetVisualization
          totalExpenses={totalExpenses}
          budget={budget}
          budgetStatus={budgetStatus}
        />

        <TransactionList
          transactions={transactions}
          isLoading={isLoading}
          error={error}
          onRefresh={refresh}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
});

export default HomeScreen;
