import React, { useState } from 'react';
import { IonContent, IonHeader, IonInput, IonPage, IonToolbar, IonButton, IonAlert, IonGrid, IonRow, IonCol, IonIcon, IonButtons } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import './Tab1.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showBadAlert, setShowBadAlert] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setShowBadAlert(true);
      return;
    }

    // Aquí puedes manejar la lógica de registro
    console.log(`Email: ${email}, Password: ${password}`);

    // Redirige al usuario a la página de inicio después de registrarse
    window.location.href = '/home';
  };
  const handleExit = () => {
    setShowAlert(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleExit}>
              <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              <h1 className="title">LIEBE</h1>
              <h1 className="subtitle">Registro</h1>
              <IonInput
                className="input-field"
                value={email}
                placeholder="Correo electrónico"
                onIonChange={e => setEmail(e.detail.value!)}
              />
              <IonInput
                className="input-field"
                value={password}
                placeholder="Contraseña"
                type="password"
                onIonChange={e => setPassword(e.detail.value!)}
              />
              <IonInput
                className="input-field"
                value={confirmPassword}
                placeholder="Confirmar contraseña"
                type="password"
                onIonChange={e => setConfirmPassword(e.detail.value!)}
              />
              <IonButton className="input-field" expand="full" onClick={handleRegister}>Registrarse</IonButton>
              <IonAlert
                isOpen={showBadAlert}
                onDidDismiss={() => setShowBadAlert(false)}
                header={'Error'}
                message={'Las contraseñas no coinciden'}
                buttons={['OK']}
              />
                <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Salir'}
                message={'¿Estás seguro de que quieres salir de la aplicación?'}
                buttons={['Cancelar', 'Salir']}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
