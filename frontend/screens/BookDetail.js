// BookDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';

const BookDetail = ({ route, navigation }) => {
    const { book, idPerson, username } = route.params;
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axios.get(`http://192.168.1.77:3000/bookDetail/${book.idBook}/${book.title}`);
                if (response.status === 200) {
                    setBookDetails(response.data);
                } else {
                    Alert.alert('Error', 'No se pudieron obtener los detalles del libro');
                }
            } catch (error) {
                Alert.alert('Error', 'Error inesperado al obtener los detalles del libro');
            }
        };
        fetchBookDetail();
    }, [book.idBook, book.title]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript son 0-11
        const year = date.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    };

    if (!bookDetails) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Cargando detalles del libro...</Text>
            </View>
        );
    }



    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.titleButton}>←</Text>
            </Pressable>
            <Text style={styles.title}>{bookDetails.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AuthorDetail', { authorName: bookDetails.author, username: username })}>
                <Text style={styles.text}>Autor: {bookDetails.author}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PublisherDetail', { publisher: bookDetails.publisher, username: username })}>
                <Text style={styles.text}>Editorial: {bookDetails.publisher}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>ISBN: {bookDetails.isbn}</Text>
            <Text style={styles.text}>Fecha de P.: {formatDate(bookDetails.publicationDate)}</Text>
            <Text style={styles.text}>Edición: {bookDetails.edition}</Text>
            <Text style={styles.text}>Género: {bookDetails.genre}</Text>
            <Text style={styles.text}>Número de páginas: {bookDetails.pageCount}</Text>
            <Text style={styles.text}>Sinopsis: {bookDetails.synopsis}</Text>

            <Pressable style={styles.button} onPress={() => {navigation.navigate('Add_UpdateBookList', { 
                idPerson, 
                username, 
                idBook: bookDetails.idBook, 
                totalPages: bookDetails.pageCount, 
                title: bookDetails.title, 
                isAdd: true });}}>
               <Text style={styles.titleButton}>Agregar a la lista</Text>
            </Pressable>
        </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
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
        textAlign: 'center'
    },
    text: {
        fontSize: 15,
        color: 'white',
        marginTop: 9,
        textAlign: 'justify'
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
        marginTop: 60
    },
    titleButton:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginTop: 20
    },
});

export default BookDetail;

