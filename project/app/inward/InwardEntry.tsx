import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

export default function InwardEntry() {
  const [formData, setFormData] = useState({
    inwardNo: 'VST/MIN00001',
    inwardDate: '05-03-2025',
    inwardType: 'Inward',
    customer: '',
    mobile: '',
    person: '',
    vehNo: '',
    outwardNo: '',
    date: '05-03-2025',
    branch: 'VISION TECH',
    narration: ''
  });

  const [tableData, setTableData] = useState([{
    sNo: 1,
    code: '',
    particular: '',
    hsnCode: '',
    quantity: '',
    uom: '',
    type: ''
  }]);

  const updateFormField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateTableRow = (index: number, field: string, value: string) => {
    const newData = [...tableData];
    newData[index] = { ...newData[index], [field]: value };
    setTableData(newData);
  };

  const addNewRow = () => {
    setTableData(prev => [...prev, {
      sNo: prev.length + 1,
      code: '',
      particular: '',
      hsnCode: '',
      quantity: '',
      uom: '',
      type: ''
    }]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Inward No</Text>
            <TextInput
              style={styles.input}
              value={formData.inwardNo}
              onChangeText={(value) => updateFormField('inwardNo', value)}
              editable={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Inward Date</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={styles.input}
                value={formData.inwardDate}
                onChangeText={(value) => updateFormField('inwardDate', value)}
              />
              <TouchableOpacity style={styles.calendarIcon}>
                <Calendar size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.headerRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Inward Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.inwardType}
                style={styles.picker}
                onValueChange={(value) => updateFormField('inwardType', value)}
              >
                <Picker.Item label="Inward" value="Inward" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
        </View>
      </View>

      {/* Customer Section */}
      <View style={styles.section}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Customer</Text>
          <TextInput
            style={styles.input}
            value={formData.customer}
            onChangeText={(value) => updateFormField('customer', value)}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Mobile</Text>
            <TextInput
              style={styles.input}
              value={formData.mobile}
              onChangeText={(value) => updateFormField('mobile', value)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Person</Text>
            <TextInput
              style={styles.input}
              value={formData.person}
              onChangeText={(value) => updateFormField('person', value)}
            />
          </View>
        </View>
      </View>

      {/* Table Section */}
      <View style={styles.tableSection}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>S.No</Text>
          <Text style={styles.tableHeaderCell}>Code</Text>
          <Text style={styles.tableHeaderCell}>Particular</Text>
          <Text style={styles.tableHeaderCell}>HSN Code</Text>
          <Text style={styles.tableHeaderCell}>Quantity</Text>
          <Text style={styles.tableHeaderCell}>UOM</Text>
          <Text style={styles.tableHeaderCell}>Type</Text>
        </View>
        <ScrollView horizontal>
          {tableData.map((row, index) => (
            <View key={row.sNo} style={styles.tableRow}>
              <TextInput
                style={styles.tableCell}
                value={row.sNo.toString()}
                editable={false}
              />
              <TextInput
                style={styles.tableCell}
                value={row.code}
                onChangeText={(value) => updateTableRow(index, 'code', value)}
              />
              <TextInput
                style={styles.tableCell}
                value={row.particular}
                onChangeText={(value) => updateTableRow(index, 'particular', value)}
              />
              <TextInput
                style={styles.tableCell}
                value={row.hsnCode}
                onChangeText={(value) => updateTableRow(index, 'hsnCode', value)}
              />
              <TextInput
                style={styles.tableCell}
                value={row.quantity}
                onChangeText={(value) => updateTableRow(index, 'quantity', value)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.tableCell}
                value={row.uom}
                onChangeText={(value) => updateTableRow(index, 'uom', value)}
              />
              <TextInput
                style={styles.tableCell}
                value={row.type}
                onChangeText={(value) => updateTableRow(index, 'type', value)}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={addNewRow}>
          <Text style={styles.addButtonText}>+ Add Row</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footerSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Branch</Text>
          <TextInput
            style={styles.input}
            value={formData.branch}
            onChangeText={(value) => updateFormField('branch', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Narration</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.narration}
            onChangeText={(value) => updateFormField('narration', value)}
            multiline
            numberOfLines={3}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerSection: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  halfWidth: {
    flex: 0.48,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    right: 8,
    height: '100%',
    justifyContent: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
  },
  tableSection: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    fontSize: 14,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#0d5c46',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerSection: {
    marginTop: 20,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});