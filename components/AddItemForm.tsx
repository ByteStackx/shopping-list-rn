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
  onError: (message: string) => void;
}

export default function AddItemForm({ onAdd, onError }: AddItemFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('');
  const [nameError, setNameError] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const handleAdd = () => {
    // Reset errors
    setNameError('');
    setQuantityError('');

    // Validate item name
    if (!name.trim()) {
      setNameError('Item name is required');
      onError('Please enter an item name');
      return;
    }

    if (name.trim().length < 2) {
      setNameError('Item name must be at least 2 characters');
      onError('Item name is too short');
      return;
    }

    if (name.trim().length > 50) {
      setNameError('Item name must be less than 50 characters');
      onError('Item name is too long');
      return;
    }

    // Validate quantity
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
      setQuantityError('Quantity must be at least 1');
      onError('Please enter a valid quantity');
      return;
    }

    if (qty > 999) {
      setQuantityError('Quantity must be less than 1000');
      onError('Quantity is too large');
      return;
    }

    // All validations passed
    onAdd(name.trim(), qty, category.trim() || undefined);
    setName('');
    setQuantity('1');
    setCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      
      <TextInput
        style={[styles.input, nameError ? styles.inputError : null]}
        placeholder="Item name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (nameError) setNameError('');
        }}
        placeholderTextColor="#999"
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      
      <View style={styles.row}>
        <View style={styles.quantityContainer}>
          <TextInput
            style={[styles.input, styles.quantityInput, quantityError ? styles.inputError : null]}
            placeholder="Qty"
            value={quantity}
            onChangeText={(text) => {
              setQuantity(text);
              if (quantityError) setQuantityError('');
            }}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          {quantityError ? <Text style={styles.errorTextSmall}>{quantityError}</Text> : null}
        </View>
        
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
  quantityContainer: {
    flex: 1,
  },
  quantityInput: {
    marginBottom: 0,
  },
  categoryInput: {
    flex: 2,
  },
  inputError: {
    borderColor: '#f44336',
    borderWidth: 2,
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 5,
  },
  errorTextSmall: {
    color: '#f44336',
    fontSize: 11,
    marginTop: 2,
    marginLeft: 5,
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
