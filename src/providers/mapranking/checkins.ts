import { post } from "./client.js";

export async function getCheckinDashboard(
    page = 1,
    search = "",
    limit = 10
) {

    return await post(
        "/user/checkin-dashboard",
        {
            page,
            search,
            limit
        }
    );

}
