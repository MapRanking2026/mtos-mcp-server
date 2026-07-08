import { post } from "./client.js";

export async function getHeatmap(
    heatmapId: string
) {
    return post(
        "/heatmap/get-heatmap",
        {
            heatmapId
        }
    );
}