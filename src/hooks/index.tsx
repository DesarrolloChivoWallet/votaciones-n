import { useState, useEffect } from "react";
import axios from "axios";

export const useMapped = () => {
    const [position, setPosition] = useState({
        lat: 13.691316,
        lng: -89.236491,
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log("🚀 ~ useEffect ~ coords:", coords)
                setPosition({ lat: coords.latitude, lng: coords.longitude });
            },
            (blocked) => {
                if (blocked) {
                    const fetch = async () => {
                        try {
                            const { data } = await axios.get("https://ipapi.co/json");
                            setPosition({ lat: data.latitude, lng: data.longitude });
                        } catch (err) {
                            console.error(err);
                        }
                    };
                    fetch();
                }
            }
        );
    }, []);
    return { position };
};