import React, { useState, useEffect } from 'react';
import { IonAvatar, IonContent, IonList, IonItem, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonButton, IonAlert, IonGrid, IonRow, IonCol, IonIcon, IonButtons, IonSelect, IonSelectOption, IonChip, IonLabel, IonPopover } from '@ionic/react';
import { personCircleOutline , arrowBack } from 'ionicons/icons';

import './Tab3.css';

const Hobbies = ['ejercicio', 'anime', 'musica', 'series', 'videojuegos', 'dibujo'];

const Profile: React.FC = () => {
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

  const handleAddChip = (hobby: string) => {
    setChips([...chips, hobby]);
    setHobbies(hobbies.filter(h => h !== hobby));
    setShowPopover(false);
  };
  const handleAddCustomChip = () => {
    if (customHobby.trim() !== '') {
      const customHobbies = customHobby.split(',').slice(0, 12).map(h => h.trim());
      const nonEmptyHobbies = customHobbies.filter(h => h !== '');
      setShowPopover(false);
      setChips(chips => [...chips, ...nonEmptyHobbies]);
      setCustomHobby('');
    }
  };
  const handleRemoveChip = (index: number) => {
    setChipToRemove(index);
    setShowRemoveAlert(true);
  };
  const handleConfirmRemoveChip = () => {
    if (chipToRemove !== null) {
      const removedChip = chips[chipToRemove];
      setChips(chips.filter((_, index) => index !== chipToRemove));
      setHobbies([...hobbies, removedChip]);
    }
    setShowRemoveAlert(false);
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

  useEffect(() => {
    if (birthdate.month) {
      setDaysInMonth(new Date(parseInt(birthdate.year), parseInt(birthdate.month), 0).getDate());
    }
  }, [birthdate.year, birthdate.month]);

  const handleSave = () => {
    fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        description,
        birthdate: new Date(`${birthdate.year}-${birthdate.month}-${birthdate.day}`),
        gender,
        phoneNumber,
        preferredGender,
        hobbies: chips,
        profilePhoto,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el perfil');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert('Perfil guardado con éxito');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error al guardar el perfil');
    });
  };
  
  const handleExit = () => {
    setShowAlert(true);
  };
  // Genera las opciones de años, meses y días
  const years = Array.from({ length: 65 }, (_, i) => 1940 + i);
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
  
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
              <h1 className="subtitle">Crea tu perfil</h1>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <IonAvatar style={{ width: '150px', height: '150px' }}>
                {profilePhoto ? <img src={profilePhoto} alt="Profile" /> : <IonIcon icon={personCircleOutline} style={{ fontSize: '150px' }} />}
              </IonAvatar>
              <IonButton fill="outline" onClick={() => document.getElementById('fileInput')?.click()}>
                Subir foto
              </IonButton>
              <input id="fileInput" type="file" accept="image/*" hidden onChange={handleUploadPhoto} />
            </div>
              <IonInput
                className="input-field"
                value={username}
                placeholder="Tu nombre"
                onIonChange={e => setUsername(e.detail.value!)}
              />
              <IonInput
                className="input-field"
                value={description}
                placeholder="Descripción"
                onIonChange={e => setDescription(e.detail.value!)}
              />
              <IonInput
                className="input-field"
                value={phoneNumber}
                placeholder="Número de teléfono"
                onIonChange={e => setPhoneNumber(e.detail.value!)}
              />
              <IonRow>
                <IonCol>
                  <IonSelect
                    value={birthdate.day}
                    placeholder="Día"
                    onIonChange={e => setBirthdate({ ...birthdate, day: e.detail.value })}
                  >
                    {days.map(day => <IonSelectOption value={day}>{day}</IonSelectOption>)}
                  </IonSelect>
                </IonCol>
                <IonCol>
                  <IonSelect
                    value={birthdate.month}
                    placeholder="Mes"
                    onIonChange={e => setBirthdate({ ...birthdate, month: e.detail.value })}
                  >
                    {months.map(month => <IonSelectOption value={month}>{month}</IonSelectOption>)}
                  </IonSelect>
                </IonCol>
                <IonCol>
                  <IonSelect
                    value={birthdate.year}
                    placeholder="Año"
                    onIonChange={e => setBirthdate({ ...birthdate, year: e.detail.value })}
                  >
                    {years.map(year => <IonSelectOption value={year}>{year}</IonSelectOption>)}
                  </IonSelect>
                </IonCol>
              </IonRow>
              <IonSelect
                value={gender}
                placeholder="Género"
                onIonChange={e => setGender(e.detail.value)}
              >
                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                <IonSelectOption value="no especificado">No especificado</IonSelectOption>
              </IonSelect>
              <IonSelect
                value={preferredGender}
                placeholder="Género preferido"
                onIonChange={e => setPreferredGender(e.detail.value)}
              >
                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                <IonSelectOption value="no especificado">No especificado</IonSelectOption>
              </IonSelect>
              <IonTitle>Hobbies</IonTitle>
              <div>
                {chips.map((chip, index) => (
                  <IonChip key={index} onClick={() => handleRemoveChip(index)}>
                    <IonLabel>{chip}</IonLabel>
                  </IonChip>
                ))}
                <IonChip onClick={() => setShowPopover(true)}>
                  <IonLabel>Añadir</IonLabel>
                </IonChip>
                <IonPopover
                  isOpen={showPopover}
                  onDidDismiss={() => setShowPopover(false)}
                >
                  {hobbies.map((hobby, index) => (
                    <IonChip key={index} onClick={() => handleAddChip(hobby)}>
                      <IonLabel>{hobby}</IonLabel>
                    </IonChip>
                  ))}
                  <IonInput value={customHobby} placeholder="Hobbies personales" onIonChange={e => setCustomHobby(e.detail.value!)} />
                  <IonButton expand="full" onClick={handleAddCustomChip}>Añadir</IonButton>
                </IonPopover>
                <IonAlert
                  isOpen={showRemoveAlert}
                  onDidDismiss={() => setShowRemoveAlert(false)}
                  header={'Confirmación'}
                  message={'¿Estás seguro de quitar el hobbie?'}
                  buttons={[
                    {
                      text: 'Cancelar',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        setShowRemoveAlert(false);
                      }
                    },
                    {
                      text: 'Aceptar',
                      handler: handleConfirmRemoveChip
                    }
                  ]}
                />
              </div>
              <IonButton className="input-field" expand="full" onClick={handleSave}>Guardar</IonButton>
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

export default Profile;
