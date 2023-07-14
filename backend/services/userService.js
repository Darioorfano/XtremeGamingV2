const { auth } = require("../config/firebase");
const { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword } = require("firebase/auth");

const login = async (emailP, password) => {
  try {
		const userCredential = await signInWithEmailAndPassword(auth, emailP, password);
		const { uid, displayName, email, emailVerified, photoURL, accessToken} = userCredential.user;
		const user = { uid, displayName, email, emailVerified, photoURL, accessToken};
		return { code: 200, mensaje: "Inicio de sesion exitoso", user: user };

	} catch (error) {
		let statusCode;
		let mensaje;
	
		switch (error.code) {
			case 'auth/invalid-email':
				statusCode = 401; // Unauthorized
				mensaje = 'Correo electrónico inválido';
				break;
			case 'auth/user-disabled':
				statusCode = 401; // Unauthorized
				mensaje = 'Usuario deshabilitado';
				break;
			case 'auth/user-not-found':
				statusCode = 404; // Not Found
				mensaje = 'Email no encontrado';
				break;
			case 'auth/wrong-password':
				statusCode = 401; // Unauthorized
				mensaje = 'Contraseña incorrecta';
				break;
			default:
				statusCode = 500; // Internal Server Error
				mensaje = 'Error en el servidor';
				break;
		}
		console.error({ code: statusCode, mensaje: mensaje })
		return { code: statusCode, mensaje: mensaje };
	}

};

const register = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Obtengo el usuario registrado
    const user = userCredential.user;

    // Actualizo el nombre del usuario despues de registrar
    await updateProfile(user, { displayName: name });
    
    // Envio mail para confirmar el correo
    await sendEmailVerification(user)

    return { code: 200, mensaje: "Usuario creado correctamente" };
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    let statusCode, mensaje;

    switch (errorCode) {
      case "auth/invalid-email":
        mensaje = "El email es invalido";
        statusCode = 400; // Bad Request
        break;
      case "auth/weak-password":
        mensaje = "La contraseña es débil";
        statusCode = 400; // Bad Request
        break;
      case "auth/email-already-in-use":
        mensaje = "El email ya esta en uso";
        statusCode = 409; // Conflict
        break;
      default:
        mensaje = "Error en servidor";
        statusCode = 500; // Internal Server Error
        break;
    }

    return { code: statusCode, mensaje: mensaje };
  }
};

module.exports = {
  login,
  register,
};
