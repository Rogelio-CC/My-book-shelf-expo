import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const imageMyBookShelf = require('../assets/MYBOOKSHELF_LOGO-Photoroom.png');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('No valido', 'Las contraseñas no coinciden.');
            return;
        }

        if(username.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0){
            Alert.alert('No valido', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            console.log('Datos enviados:', { username, password });
            // Se cambió la IP para que funcione en la red local (era 77.3000, ahora es 79.8080)
            const response = await axios.post('http://192.168.1.79:8080/crearCuenta', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const { idPerson, username } = response.data;
                Alert.alert('Registro exitoso', 'Ya creaste la cuenta.');
                navigation.navigate('WelcomePage', { idPerson, username });
            } 
        } catch (error) {
            Alert.alert('Error', 'Registro fallido por problema en el servidor');
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
             <Image
                style={styles.image}
                source={imageMyBookShelf}
                contentFit="contain"
            />
            <Text style={styles.title}>Crear cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
           <Pressable style={styles.button} onPress={handleRegister}>
               <Text style={styles.titleButton}>Aceptar</Text>
            </Pressable>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F39C12',
        paddingBottom: 90,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 8
    },
    title:{
      marginBottom: 25,
      justifyContent: 'center',
      fontSize: 30,
      color: 'white',
    },
    text: {
      color: 'white',
      marginTop: 25,
      justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        marginBottom: -140
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
    }, 
    titleButton:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    }
});

export default Register;
