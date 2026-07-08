import { post } from "./client.js";

export async function getTrackerDashboard(
    page = 1,
    search = "",
    limit = 10
) {

    return await post(
        "/user/tracker-dashboard",
        {
            page,
            search,
            limit
        }
    );

}