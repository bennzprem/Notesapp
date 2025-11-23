import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Refresh when going back
import { getNotes, deleteNote } from '../storage';

export default function HomeScreen({ route, navigation }) {
  const { username } = route.params;
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('date'); // 'date' or 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadNotes();
  }, [isFocused]);

  const loadNotes = async () => {
    const data = await getNotes(username);
    setNotes(data);
  };

  // --- SEARCH AND SORT LOGIC ---
  const getFilteredNotes = () => {
    let result = notes.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.body.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortType === 'date') {
        return sortOrder === 'desc' ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt;
      } else {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });
    return result;
  };

  const handleDelete = async (id) => {
    await deleteNote(username, id);
    loadNotes();
  };

  return (
    <View style={styles.container}>
      {/* Header & Logout */}
      <View style={styles.header}>
        <Text style={styles.welcome}>User: {username}</Text>
        <Button title="Logout" color="red" onPress={() => navigation.replace('Login')} />
      </View>

      {/* Search Bar */}
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search title or body..." 
        value={search} 
        onChangeText={setSearch} 
      />

      {/* Sort Controls */}
      <View style={styles.sortContainer}>
        <Button title={`Sort: ${sortType}`} onPress={() => setSortType(sortType === 'date' ? 'title' : 'date')} />
        <Button title={`Order: ${sortOrder}`} onPress={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} />
      </View>

      {/* Notes List */}
      <FlatList
        data={getFilteredNotes()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Editor', { username, note: item })}
          >
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.thumb} />}
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text numberOfLines={1} style={styles.cardBody}>{item.body}</Text>
            </View>
            <Button title="X" color="red" onPress={() => handleDelete(item.id)} />
          </TouchableOpacity>
        )}
      />

      {/* FAB (Floating Action Button) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Editor', { username })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  welcome: { fontSize: 18, fontWeight: 'bold' },
  searchBar: { backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 10 },
  sortContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  card: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  thumb: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  textContainer: { flex: 1 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardBody: { color: 'gray' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: 'blue', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  fabText: { color: 'white', fontSize: 30 }
});