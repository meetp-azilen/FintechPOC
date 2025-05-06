import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { HomeBottomTabNavigationProp } from "../../../navigation/types"; // Import the specific type
import { useBudget } from "../../../shared/hooks/useBudget";
import { useTransactions } from "../../../shared/hooks/useTransactions";
import strings from "../../../shared/localization/strings";
import { colors, spacing } from "../../../shared/utils/theme";
import BudgetInput from "../components/BudgetInput";
import BudgetVisualization from "../components/BudgetVisualization";
import TransactionList from "../components/TransactionList";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeBottomTabNavigationProp>();
  const { transactions, isLoading, error, totalExpenses, refresh } =
    useTransactions();

  const { budget, setBudgetAmount, getBudgetStatus } = useBudget();

  const budgetStatus = getBudgetStatus(totalExpenses);

  const handleSeeAllTransactions = () => {
    navigation.navigate("Transactions");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>{strings.homeScreenTitle}</Text>
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
          transactions={transactions.slice(0, 3)}
          isLoading={isLoading}
          error={error}
          onRefresh={refresh}
          title={strings.transactionsTitle}
          showSeeAllButton={true}
          onSeeAllPress={handleSeeAllTransactions} // Pass the handler
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
    padding: spacing.large,
    paddingBottom: spacing.medium,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white,
  },
  scrollView: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    paddingHorizontal: spacing.large,
    paddingTop: spacing.large,
    paddingBottom: spacing.x_large,
  },
});

export default HomeScreen;
