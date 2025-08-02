import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert, Pressable } from 'react-native';
import axios from 'axios';

const Catalogue = ( {route, navigation} ) => {
    const { idPerson, username } = route.params;
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://192.168.1.77:3000/books');
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
        </TouchableOpacity>
    );


    const handlePress = (book) => {
        navigation.navigate('BookDetail', { book: book, idPerson, username })
    };


    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.titleButton}>←</Text>
            </Pressable>
            <Text style={styles.header}>Libros disponibles</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F39C12',
        paddingTop: 90
    },
    item: {
        backgroundColor: '#F4D03F',
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        marginTop: 15,
        borderRadius: 20
    },
    title: {
        fontSize: 25,
    },
    author: {
        fontSize: 20,
        color: '#666',
    },
    header: {
        fontSize: 30,
        marginBottom: 30,
        color: 'white'
    },
    backButton: {
        marginLeft: -280,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginBottom: 20,
    },
    titleButton:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Catalogue;
