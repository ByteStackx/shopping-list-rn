import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { loadItems } from './shoppingListSlice';
import { storageService } from './storage';

export const useShoppingListPersistence = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.shoppingList.items);

  // Load items from AsyncStorage when app starts
  useEffect(() => {
    const loadStoredItems = async () => {
      const storedItems = await storageService.loadItems();
      if (storedItems.length > 0) {
        dispatch(loadItems(storedItems));
      }
    };

    loadStoredItems();
  }, [dispatch]);

  // Save items to AsyncStorage whenever they change
  useEffect(() => {
    storageService.saveItems(items);
  }, [items]);
};
