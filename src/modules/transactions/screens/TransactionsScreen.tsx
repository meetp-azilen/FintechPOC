import React from "react";
import { StyleSheet, View } from "react-native";
import { useTransactions } from "../../../shared/hooks/useTransactions";
import strings from "../../../shared/localization/strings"; // Import strings
import { spacing } from "../../../shared/utils/theme";
import TransactionList from "../../dashboard/components/TransactionList";

const TransactionsScreen = () => {
  const { transactions, isLoading, error, totalExpenses, refresh } =
    useTransactions();

  return (
    <View style={styles.container}>
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        error={error}
        onRefresh={refresh}
        title={strings.allTransactionsTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal:spacing.medium, marginTop:spacing.medium },
});

export default TransactionsScreen;