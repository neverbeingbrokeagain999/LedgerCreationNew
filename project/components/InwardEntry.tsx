import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Item {
  id: number;
  code: string;
  particular: string;
  hsnCode: string;
  quantity: string;
  uom: string;
  type: string;
}

const InwardEntry = () => {
  const [billType, setBillType] = useState('Non-GST Bill');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState('');
  const [payType, setPayType] = useState('Credit');
  const [shipTo, setShipTo] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [gst, setGst] = useState('');
  const [disc, setDisc] = useState('');
  const [rate, setRate] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now(),
      code: searchItem,
      particular: 'Sample Item',
      hsnCode: '12345',
      quantity: quantity,
      uom: 'PCS',
      type: billType
    };

    setItems([...items, newItem]);
    // Reset form fields
    setSearchItem('');
    setQuantity('');
    setGst('');
    setDisc('');
    setRate('');
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>INWARD ENTRY</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Bill Type Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Inward Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={billType}
              onValueChange={(value) => setBillType(value)}
              style={styles.picker}
            >
              <Picker.Item label="Non-GST Bill" value="Non-GST Bill" />
              <Picker.Item label="GST Bill" value="GST Bill" />
            </Picker>
          </View>
        </View>

        {/* Invoice Number Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Inward No</Text>
          <TextInput
            style={styles.input}
            value={invoiceNo}
            onChangeText={setInvoiceNo}
            placeholder="Enter Invoice Number"
          />
        </View>

        {/* Date Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Inward Date</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
          />
        </View>

        {/* Customer Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Supplier</Text>
          <TextInput
            style={styles.input}
            value={customer}
            onChangeText={setCustomer}
            placeholder="Enter Customer Name"
          />
        </View>

        {/* Pay Type and Ship To Section */}
        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Pay Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={payType}
                onValueChange={(value) => setPayType(value)}
                style={styles.picker}
              >
                <Picker.Item label="Credit" value="Credit" />
                <Picker.Item label="Cash" value="Cash" />
              </Picker>
            </View>
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Ship To</Text>
            <TextInput
              style={styles.input}
              value={shipTo}
              onChangeText={setShipTo}
              placeholder="Enter Shipping Address"
            />
          </View>
        </View>

        {/* Add Item Section */}
        <View style={styles.itemSection}>
          <Text style={styles.sectionTitle}>ADD ITEM</Text>
          <TextInput
            style={styles.input}
            value={searchItem}
            onChangeText={setSearchItem}
            placeholder="Search for a item"
          />

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholder="Enter Quantity"
              />
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>GST</Text>
              <TextInput
                style={styles.input}
                value={gst}
                onChangeText={setGst}
                keyboardType="numeric"
                placeholder="Enter GST"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Disc</Text>
            <TextInput
              style={styles.input}
              value={disc}
              onChangeText={setDisc}
              keyboardType="numeric"
              placeholder="Enter Discount"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Rate</Text>
            <TextInput
              style={styles.input}
              value={rate}
              onChangeText={setRate}
              keyboardType="numeric"
              placeholder="Enter Rate"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddItem}>
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.snoCell]}>S.No</Text>
            <Text style={[styles.tableHeaderCell, styles.codeCell]}>Code</Text>
            <Text style={[styles.tableHeaderCell, styles.particularCell]}>Particular</Text>
            <Text style={[styles.tableHeaderCell, styles.hsnCell]}>HSN Code</Text>
            <Text style={[styles.tableHeaderCell, styles.qtyCell]}>Quantity</Text>
            <Text style={[styles.tableHeaderCell, styles.uomCell]}>UOM</Text>
            <Text style={[styles.tableHeaderCell, styles.typeCell]}>Type</Text>
            <Text style={[styles.tableHeaderCell, styles.actionCell]}>Action</Text>
          </View>

          {/* Table Body */}
          {items.map((item, index) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.snoCell]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.codeCell]}>{item.code}</Text>
              <Text style={[styles.tableCell, styles.particularCell]}>{item.particular}</Text>
              <Text style={[styles.tableCell, styles.hsnCell]}>{item.hsnCode}</Text>
              <Text style={[styles.tableCell, styles.qtyCell]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, styles.uomCell]}>{item.uom}</Text>
              <Text style={[styles.tableCell, styles.typeCell]}>{item.type}</Text>
              <TouchableOpacity 
                style={[styles.tableCell, styles.actionCell]}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Total Amount Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total Amount : 0.0</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffebee',
  },
  header: {
    backgroundColor: '#009688',
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  formContainer: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#009688',
    padding: 12,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  table: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0f2f1',
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#009688',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 12,
    backgroundColor: '#fff',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#333',
  },
  tableCell: {
    color: '#666',
  },
  snoCell: {
    width: 40,
  },
  codeCell: {
    flex: 1,
  },
  particularCell: {
    flex: 2,
  },
  hsnCell: {
    flex: 1,
  },
  qtyCell: {
    width: 60,
  },
  uomCell: {
    width: 60,
  },
  typeCell: {
    flex: 1,
  },
  actionCell: {
    width: 80,
  },
  deleteText: {
    color: '#f44336',
    textAlign: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B5E',
    color: '#333',
  },
});

export default InwardEntry;