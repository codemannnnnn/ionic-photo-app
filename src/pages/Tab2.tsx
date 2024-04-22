import { camera, trash, close } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
} from '@ionic/react'
import {Card, CardHeader, ListGroupItem, ListGroup} from 'reactstrap'
import ExploreContainer from '../components/ExploreContainer';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import './Tab2.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react'


 const Tab2: React.FC = () => {
  const [api, setApi] = useState([])
  const {photos,takePhoto, deletePhoto} = usePhotoGallery()
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();


  useEffect(() => {
    const grabData = () => {
      axios.get('https://api.quotable.io/random').then(e => {
        setApi(e.data.content)
      }).catch(err => {
        setApi(err.message)
      })
    }
    grabData()
    }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
        {
          <div>
          <div>{api}</div>
          </div>
        }
        <Card
  style={{
    width: '18rem'
  }}
>
  <CardHeader>
    Featured
  </CardHeader>
  <ListGroup flush>
    <ListGroupItem>
      An item
    </ListGroupItem>
    <ListGroupItem>
      A second item
    </ListGroupItem>
    <ListGroupItem>
      And a third item
    </ListGroupItem>
  </ListGroup>
</Card>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => takePhoto()}>
          <IonIcon icon={camera}></IonIcon>
        </IonFabButton>
        <IonGrid>
    <IonRow>
      {photos.map((photo, index) => (
        <IonCol size="6" key={photo.filepath}>
<IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
        </IonCol>
      ))}
    </IonRow>
  </IonGrid>
  </IonFab>
  <IonActionSheet
  isOpen={!!photoToDelete}
  buttons={[
    {
      text: 'Delete',
      role: 'destructive',
      icon: trash,
      handler: () => {
        if (photoToDelete) {
          deletePhoto(photoToDelete);
          setPhotoToDelete(undefined);
        }
      },
    },
    {
      text: 'Cancel',
      icon: close,
      role: 'cancel',
    },
  ]}
  onDidDismiss={() => setPhotoToDelete(undefined)}
/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
