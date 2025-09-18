// Importaciones con "require"
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicialización de la variable "app"
const app = express();

// Utilización de "bodyParser" y "cors" para la variable "app"
app.use(bodyParser.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123!',
    database: 'bookgestor'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// RUTAS DE API'S:

// Login (Inicio de sesión) // TODO: Impedir que un usuario con una contraseña inexistente o una cuenta inexistente no ingrese a la bienvenida (ejemplo: No entrar con rogelio con contraseña T o No entrar con T o T)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos:', { username, password });

    // VALIDAR QUE TODOS LOS CAMPOS SE COMPLETEN
    if (!username || !password) {
        res.status(401).send('Por favor, complete todos los campos');
        return;
    }

    // CONSULTAR CON EL NOMBRE DE USUARIO Y SU CONTRASEÑA
    const query = 'SELECT * FROM person WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
            res.status(200).send(results[0]);
            console.log('Resultados de la consulta:', results);
        
    });
});

// Creación de una cuenta para un nuevo usuario
app.post('/crearCuenta', (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos:', { username, password });

    // INSERTAR EL NOMBRE DE USUARIO Y SU CONTRASEÑA
    const queryInsert = 'INSERT INTO person (username, password) VALUES (?, ?)';
    db.query(queryInsert, [username, password], (err, results) => {
        if (err) {
            console.error('Error en la inserción:', err);
            res.status(500).send('Error en el servidor');
            return;
        }

        // CONSULTAR CON EL NOMBRE DE USUARIO
        const querySelect = 'SELECT * FROM person WHERE username = ?';
        db.query(querySelect, [username], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                res.status(500).send('Error en el servidor');
                return;
            }
                const user = results[0];
                res.status(200).send(user);
            
        });
    });
});

// Obtención todos los libros y mostrarlos en el catálogo
app.get('/books', (req, res) => {

    // CONSULTAR TODOS LOS DATOS DEL LIBRO
    const query = `
        SELECT book.idBook, book.title, 
        CONCAT(author.firstName, ' ', author.lastName) AS author 
        FROM book 
        JOIN author ON book.idAuthor = author.idAuthor
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).json(results);
    });
});

// Actualización de contraseña de un usuario
app.put('/changePassword', (req, res) => {
    const { idPerson, username, oldPassword, newPassword } = req.body;
    console.log('Datos recibidos:', { idPerson, username, oldPassword, newPassword });

    // VERIFICA SI LA CONTRASEÑA ANTIGUA Y EL USUARIO COINCIDEN
    const query = 'SELECT * FROM person WHERE idPerson = ? AND username = ? AND password = ?';
    db.query(query, [idPerson, username, oldPassword], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        console.log('Resultados de la consulta:', results);

        if (results.length > 0) {
            // SI SE CUMPLE LO ANTERIOR, SE ACTUALIZA LA CONTRASEÑA
            const updateQuery = 'UPDATE person SET password = ? WHERE idPerson = ? AND username = ?';
            db.query(updateQuery, [newPassword, idPerson, username], (err, updateResults) => {
                if (err) {
                    console.error('Error en la actualización:', err);
                    res.status(500).send('Error en el servidor');
                    return;
                }
                console.log('Resultados de la actualización:', updateResults);
                res.status(200).send('Contraseña actualizada exitosamente');
            });
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    });
});

// Obtención de los libros de un usuario y mostrarlos en su lista de libros
app.get('/userBooks/:idPerson/:username', (req, res) => {
    const { idPerson, username } = req.params;
    console.log('Datos recibidos:', { idPerson, username });

    const query = `
        SELECT book.idBook, book.title, book.publicationDate, 
        CONCAT(author.firstName, ' ', author.lastName) AS author 
        FROM book
        JOIN author ON book.idAuthor = author.idAuthor
        INNER JOIN person_book ON book.idBook = person_book.idBook
        INNER JOIN person ON person_book.idPerson = person.idPerson
        WHERE person.idPerson = ? AND person.username = ?
    `;
    db.query(query, [idPerson, username], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        console.log('Resultados de la consulta:', results);
        res.status(200).json(results);
    });
});

// Visualización de los detalles de un libro
app.get('/bookDetail/:idBook/:title', (req, res) => {
    const { idBook, title } = req.params;

    const query = `
        SELECT book.idBook, book.title, book.isbn, book.publicationDate, book.edition, book.genre, book.pageCount, book.synopsis,
        CONCAT(author.firstName, ' ', author.lastName) AS author,
        publisher.publisherName AS publisher
        FROM book
        JOIN author ON book.idAuthor = author.idAuthor
        JOIN publisher ON book.idPublisher = publisher.idPublisher
        WHERE book.idBook = ? AND book.title = ?
    `;

    db.query(query, [idBook, title], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Visualización de los detalles de un autor 
app.get('/authorDetail/:author', (req, res) => {
    const { author } = req.params;

    const query = `
        SELECT 
            author.birthday, 
            author.biography,
            CONCAT(author.firstName, ' ', author.lastName) AS authorName
        FROM author
        HAVING authorName = ?
    `;

    db.query(query, [author], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Visualización de los detalles de una editorial 
app.get('/publisherDetail/:publisher', (req, res) => {
    const { publisher } = req.params;

    const query = `
        SELECT publisher.foundingDate, publisher.publisherDescription
        FROM publisher
        WHERE publisher.publisherName = ?
    `;

    db.query(query, [publisher], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Inserción de un libro a la lista personalizada del usuario
app.post('/addBookToList', (req, res) => {
    const { idPerson, idBook, readingStatus, readPages, score, review } = req.body;

    // VERIFICACIÓN DEL NÚMERO DE PÁGINAS LEÍDAS POR EL USUARIO CON EL TOTAL DE PÁGINAS DEL LIBRO
    const queryCheckPages = 'SELECT pageCount FROM book WHERE idBook = ?';
    db.query(queryCheckPages, [idBook], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en el servidor');
            return;
        }

       
        // INSERCIÓN DE UN LIBRO EN LA LISTA PERSONALIZADA DEL USUARIO UNA VEZ HECHO LO VARIFICACIÓN DE PÁGINAS DEL LIBRO
        const query = 'INSERT INTO person_book (idPerson, idBook, readingStatus, readPages, score, review) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [idPerson, idBook, readingStatus, readPages, score, review], (err, results) => {
            if (err) {
                console.error('Error en la inserción:', err);
                res.status(500).send('Error en el servidor');
                return;
            }
            res.status(200).send('Libro añadido a la lista personalizada');
        });
    });
});

// Eliminación de un libro de la lista personalizada del usuario
app.delete('/deleteBook/:idPerson/:idBook', (req, res) => {
    const { idPerson, idBook } = req.params;
    const queryDelete = 'DELETE FROM person_book WHERE idPerson = ? AND idBook = ?';
    db.query(queryDelete, [idPerson, idBook], (err, results) => {
        if (err) {
            console.error('Error en la eliminación:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).send('Libro eliminado de la lista personalizada del usuario');
    });
});


// Obtención de los datos del libro en la lista personalizada del usuario (status del libro, páginas leídas del libro, calificación del libro y reseña/review del libro). 
// Esta ruta trabaja en conjunto con la ruta "Actualización de los detalles del libro en la lista personalizada del usuario" para modificar los datos anteriormente mencionados.
app.get('/getBookDetails/:idPerson/:idBook', (req, res) => {
    const { idPerson, idBook } = req.params;
    const querySelect = 'SELECT readingStatus, readPages, score, review FROM person_book WHERE idPerson = ? AND idBook = ?';
    db.query(querySelect, [idPerson, idBook], (err, results) => {
        if (err) {
            console.error('Error fetching book details:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).send('Libro no encontrado');
        }
    });
});

// Actualización de los detalles del libro en la lista personalizada del usuario. 
// Esta ruta trabaja en conjunto con la ruta "Obtención de los datos del libro en la lista personalizada del usuario" para modificar los datos anteriormente mencionados
app.put('/updateBookDetails/:idPerson/:idBook', (req, res) => {
    const { idPerson, idBook } = req.params;
    const { readingStatus, readPages, score, review } = req.body;
    const queryUpdate = 'UPDATE person_book SET readingStatus = ?, readPages = ?, score = ?, review = ? WHERE idPerson = ? AND idBook = ?';
    db.query(queryUpdate, [readingStatus, readPages, score, review, idPerson, idBook], (err, results) => {
        if (err) {
            console.error('Error updating book details:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).send('Detalles del libro actualizados');
    });
});

// Configuración del puerto para el servidor (anteriormente estaba en 3000, pero lo cambié a 8080 por el cambio de URL e IP en el frontend)
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
