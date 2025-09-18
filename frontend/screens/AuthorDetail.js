import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

const AuthorDetail = ({ route, navigation }) => {
    const { authorName, username } = route.params;
    const [authorDetails, setAuthorDetails] = useState(null);

    useEffect(() => {
        const fetchAuthorDetail = async () => {
            try {
                // Se cambió la IP para que funcione en la red local (era 77.3000, ahora es 79.8080)
                const response = await axios.get(`http://192.168.1.79:8080/authorDetail/${authorName}`);
                if (response.status === 200) {
                    setAuthorDetails(response.data);
                } else {
                    Alert.alert('Error', 'No se pudieron obtener los detalles del autor');
                }
            } catch (error) {
                Alert.alert('Error', 'Error inesperado al obtener los detalles del autor');
            }
        };
        fetchAuthorDetail();
    }, [authorName]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript son 0-11
        const year = date.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    };

    if (!authorDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Cargando detalles del autor...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.titleButton}>←</Text>
            </Pressable>
            <Text style={styles.title}>{authorName}</Text>
            <Text style={styles.text}>Fecha de nacimiento: {formatDate(authorDetails.birthday)}</Text>
            <Text style={styles.text}>Biografía: {authorDetails.biography}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F39C12',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
        color: 'white',
        textAlign: 'center',
    },
    text: {
        fontSize: 15,
        color: 'white',
        marginTop: 9,
        textAlign: 'justify',
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        width: 110,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginTop: 60,
    },
    titleButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default AuthorDetail;
