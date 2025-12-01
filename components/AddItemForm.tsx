import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface AddItemFormProps {
  onAdd: (name: string, quantity: number, category?: string) => void;
}

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      const qty = parseInt(quantity) || 1;
      onAdd(name.trim(), qty, category.trim() || undefined);
      setName('');
      setQuantity('1');
      setCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Item name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.quantityInput]}
          placeholder="Qty"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={[styles.input, styles.categoryInput]}
          placeholder="Category (optional)"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor="#999"
        />
      </View>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAdd}
      >
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  quantityInput: {
    flex: 1,
  },
  categoryInput: {
    flex: 2,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
