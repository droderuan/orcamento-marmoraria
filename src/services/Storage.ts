import AsyncStorage from '@react-native-community/async-storage';
import Budget from '@dtos/Budget';

const storageKeys = {
  budget: '@apporcamento:budget:id:',
};

export function getAllKeysFromStorage(): Promise<string[] | null> {
  return AsyncStorage.getAllKeys();
}

export async function getAllBudgetsFromStorage(): Promise<Budget[] | null> {
  const keys = await AsyncStorage.getAllKeys();
  const budgetsIds = keys.filter(key => {
    if (key.includes(storageKeys.budget)) {
      return true;
    }
    return false;
  });

  const budgets: Budget[] = await Promise.all(
    budgetsIds.map(async budget => {
      const foundBudget = await AsyncStorage.getItem(budget);
      if (!foundBudget) {
        throw new Error(`Null reference into Storage: ${budget}`);
      }
      return JSON.parse(foundBudget);
    }),
  );
  const sortedBudgets = budgets.sort((a, b) => {
    if (a.created_at < b.created_at) {
      return 1;
    }
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 0;
  });

  return sortedBudgets;
}

export async function getBudgetFromStorage(id: string): Promise<Budget | null> {
  const budget = await AsyncStorage.getItem(storageKeys.budget + id);
  return budget ? (JSON.parse(budget) as Budget) : null;
}

export async function saveBudgetFromStorage(budget: Budget): Promise<void> {
  await AsyncStorage.setItem(
    storageKeys.budget + budget.id,
    JSON.stringify(budget),
  );
}

export async function deleteBudgetFromStorage(budgetId: string): Promise<void> {
  console.log(`deletado: ${budgetId}`);
  await AsyncStorage.removeItem(storageKeys.budget + budgetId);
}

export async function saveDataIntoStorage<T>(
  key: string,
  data: T,
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function saveBudgetIntoStorage(budget: Budget): Promise<void> {
  try {
    await AsyncStorage.setItem(
      `@apporcamento:budgets:ids:${budget.id}`,
      JSON.stringify(budget),
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getDataFromStorage<T>(key: string): Promise<T | null> {
  try {
    const recoveryData = await AsyncStorage.getItem(key);
    if (!recoveryData) {
      return null;
    }
    const parsedData = JSON.parse(recoveryData) as T;
    return parsedData;
  } catch (err) {
    console.log(err);
    return null;
  }
}
