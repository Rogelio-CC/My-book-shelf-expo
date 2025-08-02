import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Modal, Pressable, Alert } from 'react-native';
import axios from 'axios';

const ListBookPerson = ({ route, navigation }) => {
    const { idPerson, username } = route.params;
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://192.168.1.77:3000/userBooks/${idPerson}/${username}`);
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setLoading(false);
            }
        };
        fetchBooks();
    }, [idPerson, username]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
    };

    const handleDeleteBook = async (idPerson, idBook) => {
        try {
            const response = await axios.delete(`http://192.168.1.77:3000/deleteBook/${idPerson}/${idBook}`);
            if (response.status === 200) {
                setBooks(books.filter(book => book.idBook !== idBook));
                setModalVisible(false)
            }
        } catch (error) {
            console.error('Error eliminando el libro:', error);
            Alert.alert('Error', 'No se pudo eliminar el libro de la lista personalizada');
        }
    };

    const renderItem = ({ item }) => (
        <View>
            <Pressable style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>Autor: {item.author}</Text>
                <Text style={styles.date}>Fecha de publicación: {formatDate(item.publicationDate)}</Text>
            </Pressable>

            <Pressable 
            style={styles.updateButton} 
            onPress={() => navigation.navigate('Add_UpdateBookList', {
                idPerson,
                username,
                idBook: item.idBook,
                totalPages: item.totalPages, 
                title: item.title,
                isAdd: false
            })}
            >
            <Text style={styles.titleButton}>Actualizar</Text>
        </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => setModalVisible(true)}>
               <Text style={styles.titleButtonDelete}>Eliminar</Text>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>¿Deseas eliminar el libro de la lista?</Text>
                        <Pressable style={styles.yesButton} onPress={() => handleDeleteBook(idPerson, item.idBook)}>
                            <Text style={styles.yesButtonText}>Sí</Text>
                        </Pressable>
                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>No</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            
        </View>
    );

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.titleButton}>←</Text>
            </Pressable>
            <Text style={styles.header}>Tu lista de libros</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                books.length === 0 ? (
                    <View style={styles.noBooksContainer}>
                        <Text style={styles.noBooksText}>No hay libros. Agrega algunos a tu lista.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={books}
                        renderItem={renderItem}
                        keyExtractor={item => item.idBook}
                    />
                )
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
    date: {
        fontSize: 20,
        color: '#666',
    },
    header: {
        fontSize: 30,
        marginBottom: 30,
        color: 'white',
    },
    backButton: {
        marginLeft: -280,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginBottom: 20,
    },
    noBooksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noBooksText: {
        fontSize: 25,
        marginBottom: 200,
        textAlign: 'center',
        color: 'white',
    },
    deleteButton: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor: '#E74C3C',
        width: 200, 
        marginBottom: 15,
    }, 
    updateButton: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        width: 200, 
        marginBottom: 15,
    }, 
    titleButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'black',
    },
    titleButtonDelete: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: '#F4D03F',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 12,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#E74C3C',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: 90
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    yesButton: {
        backgroundColor: '#F39C12',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: 90
    },
    yesButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ListBookPerson;
