import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable } from 'react-native';
import { Image } from 'expo-image';
import axios from 'axios';

const ChangePassword = ({ route, navigation }) => {
    const { idPerson, username } = route.params;

    const imageMyBookShelf = require('../assets/MYBOOKSHELF_LOGO-Photoroom.png')
   
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert('No valido', 'Las contraseñas no coinciden.');
            return;
        }

        if(oldPassword.trim().length === 0 || newPassword.trim().length === 0 || confirmNewPassword.trim().length === 0){
            Alert.alert('No valido', 'Por favor, complete todos los campos.');
            return;
        }

        try {
            console.log('Datos enviados:', { idPerson, username, oldPassword, newPassword });
            const response = await axios.put('http://192.168.1.77:3000/changePassword', {
                idPerson: idPerson,
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            });

            if (response.status === 200) {
                Alert.alert('Éxito', 'Contraseña actualizada exitosamente');
                navigation.navigate('UserProfile', {idPerson, username});
            }
        } catch (error) {
            Alert.alert('Error', 'Contraseña no actualizada por problema en el servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.titleButton}>←</Text>
            </Pressable>
            <Image
                style={styles.image}
                source={imageMyBookShelf}
                contentFit="contain"
            />
            <Text style={styles.title}>Cambiar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Contraseña antigua"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar nueva contraseña"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry
            />

            <Pressable style={styles.button} onPress={handleChangePassword}>
               <Text style={styles.titleButton}>Cambiar contraseña</Text>
            </Pressable>
        </View>
    );
};

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
    title: {
       marginBottom: 25,
      justifyContent: 'center',
      fontSize: 30,
      color: 'white'
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
    },
    image: {
        flex: 1,
        width: '100%',
        marginBottom: -100
    },
    backButton: {
        marginLeft: -280,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginTop: 50
    },
});

export default ChangePassword;
