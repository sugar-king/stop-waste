import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/offers/';

class AdsService {

    getAllAds() {
        return axios.get(API_URL + "all", {headers: authHeader()})
    }

    getActiveAds() {
        return axios.get(API_URL, {headers: authHeader()})
    }

    getPostedAds() {
        return axios.get(API_URL + "myOffers/posted", {headers: authHeader()});
    }

    getSoldAds() {
        return axios.get(API_URL + "myOffers/sold", {headers: authHeader()});
    }

    getBoughtAds() {
        return axios.get(API_URL + "myOffers/bought", {headers: authHeader()});
    }

    getReservedAds() {
        return axios.get(API_URL + "myOffers/reserved", {headers: authHeader()});
    }

    getMyAds() {
        return axios.get(API_URL + "myOffers", {headers: authHeader()});
    }

    reserveAd(adId) {
        return axios.post(API_URL + "reserveAd/" + adId, {}, {headers: authHeader()});
    }

    adSold(adId) {
        return axios.post(API_URL + "adSold/" + adId, {}, {headers: authHeader()});
    }

    cancelReservation(adId) {
        return axios.post(API_URL + "cancelReservation/" + adId, {}, {headers: authHeader()});

    }

    postAd(caption,
           image,
           description,
           price,
           discount,
           timeOfAddition,
           timeOfExpiration) {

        let formData = new FormData();

        let model = {
            caption: caption,
            description: description,
            price: price,
            discount: discount,
            timeOfAddition: timeOfAddition,
            timeOfExpiration: timeOfExpiration
        };

        formData.append('model', JSON.stringify(model));
        formData.append('file', image);
        return axios.post(API_URL + "postAd", formData, {headers: authHeader()})
    }
}

export default new AdsService();