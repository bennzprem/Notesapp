import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { loginUser, registerUser } from '../storage';

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle Login vs Signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (!username || !password) return Alert.alert('Error', 'Fill all fields');

    if (isLogin) {
      const res = await loginUser(username, password);
      if (res.success) {
        setUsername(''); setPassword('');
        navigation.replace('Home', { username }); // Pass username to Home
      } else {
        Alert.alert('Error', res.message);
      }
    } else {
      const res = await registerUser(username, password);
      if (res.success) {
        Alert.alert('Success', 'Account created! Please login.');
        setIsLogin(true);
      } else {
        Alert.alert('Error', res.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Password/PIN" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />
      <Button title={isLogin ? "Login" : "Register"} onPress={handleAuth} />
      <Text 
        style={styles.switchText} 
        onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? "New here? Create account" : "Have an account? Login"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  switchText: { marginTop: 15, color: 'blue', textAlign: 'center' }
});