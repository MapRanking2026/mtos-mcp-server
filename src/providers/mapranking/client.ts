import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken, clearToken } from "../../auth/login.js";

dotenv.config();

export async function post(path: string, body: any) {

    let token = await getAccessToken();

    try {

        const { data } = await axios.post(
            `${process.env.API_BASE_URL}${path}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return data;

    } catch (err: any) {

        if (err.response?.status === 401) {

            clearToken();

            token = await getAccessToken();

            const retry = await axios.post(
                `${process.env.API_BASE_URL}${path}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            return retry.data;
        }

        throw err;
    }
}

export async function get(path: string) {

    let token = await getAccessToken();

    try {

        const { data } = await axios.get(
            `${process.env.API_BASE_URL}${path}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return data;

    } catch (err: any) {

        if (err.response?.status === 401) {

            clearToken();

            token = await getAccessToken();

            const retry = await axios.get(
                `${process.env.API_BASE_URL}${path}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            return retry.data;
        }

        throw err;
    }
}