import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { trashBin } from "ionicons/icons";
import "./Home.module.css";
import ImageCard from "../components/ImageCard";

import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

const Home: React.FC = () => {
  const [imagesData, setImagesData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [showData, setShowData] = useState<any>([]);

  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  useEffect(() => {
    const loadData: any = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=gcx9WLoNzbqVJyHKH-rIz4Cbswv4ow0mTQrr3IKYINg&page=${page}`
      );
      const data = await response.json();
      setImagesData(data);
    };
    loadData();
  }, [page]);

  const handleChangePageNext = () => {
    setPage(page + 1);
  };
  const handleChangePagePrevious = () => {
    if (page - 1 <= 0) {
      setPage(1);
      return;
    }
    setPage(page - 1);
  };

  function doRefresh(event: any) {
    console.log("Begin async operation");
    setTimeout(() => {
      setPage(1);
      event.detail.complete();
    }, 2000);
  }

  const logoutUser = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setShowData(imagesData.filter((img: any) => img.id.includes(search)));
  }, [search, imagesData]);

  return (
    <IonPage>
      <IonHeader>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "linear-gradient(to right, #ff6e7f, #bfe9ff)",
          }}
        >
          <IonCol
            style={{
              fontSize: "1.5rem",
              color: "#fff",
              display: "flex",
              marginTop: ".8rem",
              width: "100%",
            }}
            className="ion-justify-content-evenly ion-align-items-center ion-padding"
          >
            <span>Image Gallery</span>
            {!isLoggedIn ? (
              <Link to="/login">
                <IonButton>Login</IonButton>
              </Link>
            ) : (
              <IonButton onClick={logoutUser}>Lougout</IonButton>
            )}
          </IonCol>
          <IonCol size="12">
            <IonSearchbar
              showClearButton="always"
              color="warning"
              value={search}
              onIonChange={(e: any) => setSearch(e.target.value)}
              clearIcon={trashBin}
            ></IonSearchbar>
          </IonCol>
        </IonRow>
      </IonHeader>
      <IonContent className="ion-no-padding">
        {/* <IonRefresher
          slot="fixed"
          onIonRefresh={doRefresh}
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}
        <IonRow className="ion-justify-content-center">
          {showData.length !== 0 ? (
            showData.map((img: any, index: number) => (
              <ImageCard pic={img} key={index} />
            ))
          ) : (
            <div className="ion-padding">no results found...</div>
          )}
        </IonRow>
        <IonRow className="ion-justify-content-evenly ion-padding-vertical">
          <IonButton onClick={handleChangePagePrevious}>
            &larr; Previous
          </IonButton>
          <IonButton onClick={handleChangePageNext}>Next &rarr;</IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
