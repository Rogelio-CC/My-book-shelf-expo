import { StyleSheet, Text, View, Pressable, Image } from 'react-native';


const UserProfile = ({ route, navigation}) => {
    const { idPerson, username } = route.params;

    const imageMyBookShelf = require('../assets/MYBOOKSHELF_LOGO-Photoroom.png')

    return (
        <View style={styles.container}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.titleButton}>←</Text>
            </Pressable>
            <Text style={styles.title}>Mi perfil</Text>
            <Image
                style={styles.image}
                source={imageMyBookShelf}
            />
            <Text style={styles.title}>Datos personales</Text>
            <Text style={styles.text}>Nombre del usuario: {username}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('ChangePassword', {idPerson, username})}>
              <Text style={styles.titleButton}>Cambiar contraseña</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.titleButton} >Cerrar sesión</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('ListBookPerson', {idPerson, username})}>
              <Text style={styles.titleButton}>Ver lista de tus libros</Text>
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
    },
    title:{
      justifyContent: 'center',
      fontSize: 30,
      color: 'white'
    },
    text: {
      color: 'white',
      justifyContent: 'center',
      fontSize: 20,
      marginBottom: 40
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: -40
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 60,
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
    backButton: {
        marginLeft: -280,
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: '#F4D03F',
        marginBottom: 20,
    },
});
  
  export default UserProfile;

