import React, { useState, useEffect } from 'react';
import { IonAvatar, IonContent, IonList, IonItem, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonGrid, IonRow, IonCol, IonIcon, IonButtons, IonSelect, IonSelectOption, IonChip, IonLabel, IonPopover } from '@ionic/react';
import { personCircleOutline , arrowBack } from 'ionicons/icons';

import "./Tab4.css"

const Hobbies = ['ejercicio', 'anime', 'musica', 'series', 'videojuegos', 'dibujo'];

const ProfileU: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [birthdate, setBirthdate] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredGender, setPreferredGender] = useState('');
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [showPopover, setShowPopover] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false); // 
  const [chips, setChips] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>(Hobbies);
  const [customHobby, setCustomHobby] = useState<string>('');
  const [chipToRemove, setChipToRemove] = useState<number | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>('');

  const handleExit = () => {
    setShowAlert(true);
  };

  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const Descripciones = () => {
    const [titleText, setTitleText] = useState("Descripcion del usuario");
    const bodyText = description;
  
    const onPressTitle = () => {
      setTitleText("Bird's Nest [pressed]");
    };
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
        <IonContent fullscreen className="ion-pading">
            <IonGrid>
                <IonRow>
                    <IonCol size="12" size-md="6" offset-md="3">
                    <h1 className="title">LIEBE</h1>
                    <h1 className="subtitle">Preview de perfil</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5%' }}>
                    <IonAvatar style={{ width: '150px', height: '150px' }}>
                    {profilePhoto ? <img src={profilePhoto} alt="Profile" /> : <IonIcon icon={personCircleOutline} style={{ fontSize: '150px' }} />}
                    </IonAvatar>
                    </div>
                    <h1 className="username">
                        {username}
                        </h1>
                    <h2 className="desc">
                        {description}
                    </h2>
                    <div>
                    {chips.map((chip, index) => (
                    <IonChip key={index}>
                        <IonLabel>{chip}</IonLabel>
                    </IonChip>
                    ))}</div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  )


};

export default ProfileU;