import React, { useState } from 'react';
import { IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonGrid, IonRow, IonCol, IonIcon, IonButtons } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import './Tab2.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log(`Email: ${email}, Password: ${password}`);
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
              <h1 className="subtitle">Inicio de sesión</h1>
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
              <IonButton className="input-field" expand="full" onClick={handleLogin}>Iniciar sesión</IonButton>
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

export default Login;
