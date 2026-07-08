import { get } from "./client.js";

export async function getBusinesses() {

    return get("/business/get-business");

}