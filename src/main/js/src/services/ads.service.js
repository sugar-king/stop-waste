import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/ads/';

class AdsService{

    getAllAds() {
        return axios.get(API_URL + "all")
    }


    getPostedAds(){
        return axios.get(API_URL + "/myAds/posted");
    }

    getSoldAds(){
        return axios.get(API_URL + "/myAds/sold");
    }

    getBoughtAds(){
        return axios.get(API_URL + "/myAds/bought" );
    }

    getReservedAds(){
        return axios.get(API_URL + "/myAds/reserved/");
    }

    getMyAds(){
        return axios.get(API_URL + "/myAds/");
    }

    postAd(idAddress,
           caption,
           imagine,
           description,
           price,
           discount,
           timeOfAddition,
           timeOfExpiration){
        return axios.put(API_URL + "/postAd", {
            idAddress,
            caption,
            imagine,//ovako pise u domain/ad nez , tamo pise da sluzi za pohranu slike
            description,
            price,
            discount,
            timeOfAddition,
            timeOfExpiration

        })
    }
}

