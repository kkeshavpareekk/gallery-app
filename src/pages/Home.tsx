import {
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { trashBin } from "ionicons/icons";
import "./Home.module.css";
import ImageCard from "../components/ImageCard";
import Pagination from "@mui/material/Pagination";
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

  useEffect(() => {
    setShowData(imagesData.filter((img: any) => img.id.includes(search)));
  }, [search, imagesData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-justify-content-between ion-align-items-center">
          <span style={{ fontSize: "1.4rem", padding: ".4em" }}>
            Image Gallery
          </span>
          {isLoggedIn ? (
            <span
              className="ion-padding"
              style={{ marginLeft: "5rem", color: "blue" }}
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
              }}
            >
              Logout
            </span>
          ) : (
            <span className="ion-padding" style={{ marginLeft: "5rem" }}>
              <Link
                style={{ textDecoration: "none", color: "#03203C" }}
                to="/login"
              >
                Login
              </Link>
            </span>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <IonSearchbar
          showClearButton="always"
          color="secondary"
          value={search}
          onIonChange={(e: any) => setSearch(e.target.value)}
          clearIcon={trashBin}
        ></IonSearchbar>
        <IonRow className="ion-justify-content-center">
          {showData.length !== 0 ? (
            showData.map((img: any, index: number) => (
              <ImageCard pic={img} key={index} />
            ))
          ) : (
            <div className="ion-padding">no results found...</div>
          )}
        </IonRow>
        <IonRow className="ion-display-flex ion-justify-content-center ion-padding-vertical">
          <Pagination
            count={10}
            page={page}
            onChange={(e, value: number) => setPage(value)}
          />
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
