import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AddItemForm from '../components/AddItemForm';
import EditItemModal from '../components/EditItemModal';
import ShoppingItemComponent from '../components/ShoppingItem';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addItem,
    clearList,
    deleteItem,
    editItem,
    ShoppingItem as ShoppingItemType,
    togglePurchased,
} from '../store/shoppingListSlice';

export default function Index() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.shoppingList.items);
  const [editingItem, setEditingItem] = useState<ShoppingItemType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddItem = (name: string, quantity: number, category?: string) => {
    dispatch(addItem({ name, quantity, category }));
  };

  const handleEditItem = (item: ShoppingItemType) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleSaveEdit = (item: ShoppingItemType) => {
    dispatch(editItem(item));
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteItem(id)),
        },
      ]
    );
  };

  const handleTogglePurchased = (id: string) => {
    dispatch(togglePurchased(id));
  };

  const handleClearList = () => {
    if (items.length === 0) return;
    
    Alert.alert(
      'Clear List',
      'Are you sure you want to clear all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => dispatch(clearList()),
        },
      ]
    );
  };

  const purchasedCount = items.filter((item) => item.purchased).length;
  const totalCount = items.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        {totalCount > 0 && (
          <View style={styles.statsContainer}>
            <Text style={styles.stats}>
              {purchasedCount} / {totalCount} purchased
            </Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearList}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <AddItemForm onAdd={handleAddItem} />

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your shopping list is empty</Text>
          <Text style={styles.emptySubtext}>Add items to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ShoppingItemComponent
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onToggle={handleTogglePurchased}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <EditItemModal
        visible={modalVisible}
        item={editingItem}
        onSave={handleSaveEdit}
        onCancel={() => {
          setModalVisible(false);
          setEditingItem(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#bbb',
  },
});
