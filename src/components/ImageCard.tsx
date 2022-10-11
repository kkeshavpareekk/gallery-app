import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
} from "@ionic/react";
import styles from "../pages/Home.module.css";
import React from "react";
import { heart, person } from "ionicons/icons";
import { Link } from "react-router-dom";

interface Props {
  pic: any;
}

const ImageCard: React.FC<Props> = ({ pic }) => {
  return (
    <IonCol
      size="10"
      className="animate__animated animate__fadeIn ion-no-padding"
    >
      <IonCard>
        <IonCardContent className="ion-no-padding">
          <Link to={`details/${pic.id}`}>
            <IonImg src={pic.urls.full} />
          </Link>
          <IonAccordionGroup>
            <IonAccordion>
              <IonItem slot="header" color="secondary">
                <IonLabel>Know more..</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <p>
                  <IonIcon icon={heart} /> {pic.likes}
                </p>
                <p>
                  <IonIcon icon={person} /> {pic.user.username}
                </p>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
};

export default ImageCard;
