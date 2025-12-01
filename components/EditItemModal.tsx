import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ShoppingItem } from '../store/shoppingListSlice';

interface EditItemModalProps {
  visible: boolean;
  item: ShoppingItem | null;
  onSave: (item: ShoppingItem) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

export default function EditItemModal({
  visible,
  item,
  onSave,
  onCancel,
  onError,
}: EditItemModalProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('');
  const [nameError, setNameError] = useState('');
  const [quantityError, setQuantityError] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity.toString());
      setCategory(item.category || '');
      setNameError('');
      setQuantityError('');
    }
  }, [item]);

  const handleSave = () => {
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
    if (item) {
      const updatedItem: ShoppingItem = {
        ...item,
        name: name.trim(),
        quantity: qty,
        category: category.trim() || undefined,
      };
      onSave(updatedItem);
    }
  };

  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit Item</Text>

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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
