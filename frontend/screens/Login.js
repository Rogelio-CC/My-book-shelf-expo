import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const imageMyBookShelf = require('../assets/MYBOOKSHELF_LOGO-Photoroom.png')

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('No valido', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            console.log('Datos enviados:', { username, password });
            const response = await axios.post('http://192.168.1.77:3000/login', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const { idPerson, username } = response.data;
                Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente.');
                navigation.navigate('WelcomePage', {
                    idPerson: idPerson, 
                    username: username,
                });
            } 
           
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Alert.alert('Error', 'El nombre de usuario y la contraseña no coinciden. Intentalo de nuevo.');
            } else {
                console.error('Error en el inicio de sesión:', error);
                Alert.alert('Error', 'Hubo un problema con el servidor');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={imageMyBookShelf}
                contentFit="contain"
            />
            <Text style={styles.title}>Iniciar sesión</Text>
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

            <Pressable style={styles.button} onPress={handleLogin}>
               <Text style={styles.titleButton}>Aceptar</Text>
            </Pressable>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.text}>¿No tienes una cuenta? Registrate aquí</Text>
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
      color: 'white'
    },
    text: {
      color: 'white',
      marginTop: 25,
      justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        marginBottom: -180
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

export default Login;
