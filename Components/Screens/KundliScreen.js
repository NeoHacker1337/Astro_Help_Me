import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const KundliScreen = () => {
  const [selectedGender, setSelectedGender] = useState('Male');

  // Date and Time State
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Functions to handle date and time change
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setTime(selectedTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Name Input */}
      <TextInput style={styles.input} placeholder="Enter Name" placeholderTextColor="#888" />

      {/* Date and Time Input */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.box, styles.halfWidth]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.pickerText}>
            {date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, styles.halfWidth]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.pickerText}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
      )}
      {showTimePicker && (
        <DateTimePicker value={time} mode="time" display="default" onChange={onChangeTime} />
      )}

      {/* Location */}
      <View style={styles.box}>
        <Text style={styles.label}>Agra</Text>
        <Text style={styles.subLabel}>( 027N09, 078E00 +5.5 )</Text>
      </View>

      {/* Gender Selection */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'Male' && styles.selectedGender,
          ]}
          onPress={() => setSelectedGender('Male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'Female' && styles.selectedGender,
          ]}
          onPress={() => setSelectedGender('Female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Save and Settings */}
      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkbox}>✅</Text>
          <Text style={styles.saveText}>Save</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Settings ➕</Text>
        </TouchableOpacity>
      </View>

      {/* Get Horoscope Button */}
      <TouchableOpacity style={styles.getButton}>
        <Text style={styles.getButtonText}>GET HOROSCOPE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default KundliScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  halfWidth: {
    width: '48%',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    color: '#555',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedGender: {
    backgroundColor: '#ffcc00',
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 18,
    marginRight: 5,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  getButton: {
    backgroundColor: '#ffcc00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  getButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
