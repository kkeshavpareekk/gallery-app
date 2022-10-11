import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  cloudDownloadOutline,
  createOutline,
  eyeOutline,
  heartOutline,
  linkOutline,
  linkSharp,
  personCircleOutline,
} from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import { authContext } from "../context/authContext";

const Details: React.FC = () => {
  const params: any = useParams();
  const { isLoggedIn } = useContext(authContext);

  const [imgData, setImageData] = useState<any>();

  useEffect(() => {
    const loadImgData = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/${params.id}/?client_id=gcx9WLoNzbqVJyHKH-rIz4Cbswv4ow0mTQrr3IKYINg`
      );
      const data = await response.json();
      setImageData(data);
    };
    loadImgData();
  }, []);

  return isLoggedIn ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Image Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonImg src={imgData?.urls.full} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonIcon icon={eyeOutline} className="ion-padding" />
              {imgData?.views}
            </IonItem>
            <IonItem>
              <IonIcon icon={heartOutline} className="ion-padding" />
              {imgData?.likes}
            </IonItem>
            <IonItem>
              <IonIcon icon={cloudDownloadOutline} className="ion-padding" />
              {imgData?.downloads}
            </IonItem>
            <IonItem>
              <IonIcon icon={createOutline} className="ion-padding" />
              {imgData?.created_at}
            </IonItem>
            <IonItem>
              <IonIcon icon={linkSharp} className="ion-padding" />
              {imgData?.links.self}
            </IonItem>
            <IonItem>
              <IonIcon icon={personCircleOutline} className="ion-padding" />
              {imgData?.user.name}
            </IonItem>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  ) : (
    <Redirect to="/login" />
  );
};

export default Details;
