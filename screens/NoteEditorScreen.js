import React, { useState } from 'react';
import { View, TextInput, Button, Image, Alert, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveNote } from '../storage';

export default function NoteEditorScreen({ route, navigation }) {
  const { username, note } = route.params;
  
  const [title, setTitle] = useState(note ? note.title : '');
  const [body, setBody] = useState(note ? note.body : '');
  const [imageUri, setImageUri] = useState(note ? note.imageUri : null);

  const pickImage = async (useCamera) => {
    let result;
    if (useCamera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    }

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!title) return Alert.alert("Error", "Title is required");
    
    const newNote = { 
      id: note ? note.id : null, // If ID exists, we are editing
      title, 
      body, 
      imageUri 
    };
    
    await saveNote(username, newNote);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput 
        style={styles.inputTitle} 
        placeholder="Note Title" 
        value={title} 
        onChangeText={setTitle} 
      />
      
      <TextInput 
        style={styles.inputBody} 
        placeholder="Write your note here..." 
        value={body} 
        onChangeText={setBody} 
        multiline 
      />

      <View style={styles.imgButtons}>
        <Button title="Pick from Gallery" onPress={() => pickImage(false)} />
        <View style={{width: 10}} />
        <Button title="Take Photo" onPress={() => pickImage(true)} />
      </View>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <View style={styles.saveBtn}>
        <Button title="Save Note" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputTitle: { fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1, marginBottom: 15, padding: 5 },
  inputBody: { fontSize: 16, height: 150, textAlignVertical: 'top', borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 15 },
  imgButtons: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  previewImage: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10, marginBottom: 15 },
  saveBtn: { marginBottom: 30 }
});