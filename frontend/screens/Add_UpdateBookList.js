import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Add_UpdateBookList = ({ route, navigation }) => {
    const { idPerson, username, idBook, totalPages, title, isAdd } = route.params;
    const [status, setStatus] = useState('');
    const [pagesRead, setPagesRead] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    if(isAdd === true){
        const handleAddBook = async () => {
            if (parseInt(pagesRead) > parseInt(totalPages)) {
                Alert.alert('Error', 'El número de páginas leídas no puede exceder el total de páginas del libro.');
                return;
            }

            if(status === null || pagesRead.trim().length === 0){
                Alert.alert('No valido', 'Por favor, complete todos los campos.');
                return;
            }
            try {
                console.log('Datos enviados:', { idPerson, idBook, status, pagesRead, rating, review });
                const response = await axios.post('http://192.168.1.77:3000/addBookToList', {
                    idPerson,
                    idBook,
                    readingStatus: parseInt(status),
                    readPages: parseInt(pagesRead),
                    score: parseInt(rating),
                    review
                });
    
                if (response.status === 200) {
                    Alert.alert('Libro añadido a la lista personalizada');
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Error al añadir el libro:', error);
                Alert.alert('Error', 'No se pudo añadir el libro a la lista personalizada');
            }
        };

        return (
            <View style={styles.container}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.titleButton}>←</Text>
                </Pressable>
    
                <Text style={styles.title}>{title}</Text>
    
                <Text style={styles.text}>Status:</Text>
                <Picker
                    selectedValue={status}
                    style={styles.input}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                >
                    <Picker.Item label="Leído" value="1" />
                    <Picker.Item label="Pendiente" value="2" />
                    <Picker.Item label="En proceso" value="3" />
                </Picker>
    
                <Text style={styles.text}>Páginas leídas:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={('Páginas leídas / ' + totalPages)}
                    keyboardType="numeric"
                    value={pagesRead}
                    onChangeText={setPagesRead}
                />
    
                <Text style={styles.text}>Calificación:</Text>
                <Picker
                    selectedValue={rating}
                    style={styles.input}
                    onValueChange={(itemValue) => setRating(itemValue)}
                >
                    {[...Array(11).keys()].map(i => (
                        <Picker.Item key={i} label={`${i}`} value={`${i}`} />
                    ))}
                </Picker>
    
                <Text style={styles.text}>Reseña:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Reseña"
                    value={review}
                    onChangeText={setReview}
                />
    
                <Pressable style={styles.button} onPress={handleAddBook}>
                   <Text style={styles.titleButton}>Añadir libro</Text>
                </Pressable>
            </View>
        );

    }
    else{
        if(isAdd === false){
            
            useEffect(() => {
                // Obtener datos existentes del libro para prellenar los campos
                const fetchBookDetails = async () => {
                    try {
                        const response = await axios.get(`http://192.168.1.77:3000/getBookDetails/${idPerson}/${idBook}`);
                        const bookData = response.data;
                        setStatus(bookData.readingStatus.toString());
                        setPagesRead(bookData.readPages.toString());
                        setRating(bookData.score);
                        setReview(bookData.review);
                    } catch (error) {
                        console.error('Error fetching book details:', error);
                        Alert.alert('Error', 'No se pudieron obtener los detalles del libro');
                    }
                };
                fetchBookDetails();
            }, [idPerson, idBook]);
        
        
            const handleUpdateBook = async () => {
                if (parseInt(pagesRead) > parseInt(totalPages)) {
                    Alert.alert('Error', 'El número de páginas leídas no puede exceder el total de páginas del libro.');
                    return;
                }
        
                try {
                    const response = await axios.put(`http://192.168.1.77:3000/updateBookDetails/${idPerson}/${idBook}`, {
                        readingStatus: parseInt(status),
                        readPages: parseInt(pagesRead),
                        score: parseInt(rating),
                        review
                    });
        
                    if (response.status === 200) {
                        Alert.alert('Libro actualizado en la lista personalizada');
                        navigation.goBack();
                    }
                } catch (error) {
                    console.error('Error updating book:', error);
                    Alert.alert('Error', 'No se pudo actualizar el libro en la lista personalizada');
                }
            };

            return (
                <View style={styles.container}>
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.titleButton}>←</Text>
                    </Pressable>
        
                    <Text style={styles.title}>{title}</Text>
        
                    <Text style={styles.text}>Status:</Text>
                    <Picker
                        selectedValue={status}
                        style={styles.input}
                        onValueChange={(itemValue) => setStatus(itemValue)}
                    >
                        <Picker.Item label="Leído" value="1" />
                        <Picker.Item label="Pendiente" value="2" />
                        <Picker.Item label="En proceso" value="3" />
                    </Picker>
        
                    <Text style={styles.text}>Páginas leídas:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={('Páginas leídas / ' + totalPages)}
                        keyboardType="numeric"
                        value={pagesRead}
                        onChangeText={setPagesRead}
                    />
        
                    <Text style={styles.text}>Calificación:</Text>
                    <Picker
                        selectedValue={rating}
                        style={styles.input}
                        onValueChange={(itemValue) => setRating(itemValue)}
                    >
                        {[...Array(11).keys()].map(i => (
                            <Picker.Item key={i} label={`${i}`} value={`${i}`} />
                        ))}
                    </Picker>
        
                    <Text style={styles.text}>Reseña:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Reseña"
                        value={review}
                        onChangeText={setReview}
                    />
        
                    <Pressable style={styles.button} onPress={handleUpdateBook}>
                        <Text style={styles.titleButton}>Actualizar libro</Text>
                    </Pressable>
                </View>
            );
        }
    }
   
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F39C12',
        paddingBottom: 30,
    },
    title: {
        justifyContent: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40
    },
    input: {
        height: 60,
        width: 350,
        marginBottom: 30,
        paddingHorizontal: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        color: 'white',
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
      },
      button: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        width: 200
    }, 
    titleButton:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    backButton: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        width: 110,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginTop: 60
    },

});

export default Add_UpdateBookList;
