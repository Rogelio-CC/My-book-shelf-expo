import { StyleSheet, Text, View, Pressable, Image } from 'react-native';


const WelcomePage = ({ route, navigation }) => {
  const { idPerson, username } = route.params;
  const iconoUsuarioBienvenida = require('../assets/Usuario_boton_perfil_1.png');
  const iconoLibroCatalogo = require('../assets/libros_boton_catalogo.png');

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Bienvenido {username}, ¿qué desea ver?</Text>

          <Pressable style={styles.button} onPress={() => navigation.navigate('UserProfile', {
            idPerson,
            username
          })}>
              <Image
                  style={styles.image}
                  source={iconoUsuarioBienvenida}
              />
              <Text style={styles.titleButton}>Perfil</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Catalogue', {
            idPerson,
            username
          })}>
              <Image
                  style={styles.image}
                  source={iconoLibroCatalogo}
              />
              <Text style={styles.titleButton}>Ver catálogo</Text>
          </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F39C12',
  },
  title: {
      fontSize: 30,
      marginTop: 150,
      textAlign: 'center',
      color: 'white',
      paddingBottom: 80
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 8,
      backgroundColor: '#F4D03F',
      marginBottom: 30,
      flexDirection: 'column'
  },
  image: {
      width: 40,
      height: 40,
      marginBottom: 10
  },
  titleButton: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      color: 'black',
  }
});

export default WelcomePage;