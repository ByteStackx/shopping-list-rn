import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ShoppingItem } from '../store/shoppingListSlice';

interface ShoppingItemProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function ShoppingItemComponent({ 
  item, 
  onEdit, 
  onDelete, 
  onToggle 
}: ShoppingItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => onToggle(item.id)}
      >
        <View style={[styles.checkbox, item.purchased && styles.checkboxChecked]}>
          {item.purchased && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.name, item.purchased && styles.purchasedText]}>
          {item.name}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={styles.quantity}>Qty: {item.quantity}</Text>
          {item.category && (
            <Text style={styles.category}>{item.category}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  purchasedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  category: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
