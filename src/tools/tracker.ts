import { registry } from "../ai/registry.js";
import { getTrackerDashboard } from "../providers/mapranking/tracker.js";

registry.register({

    name: "tracker_dashboard",

    description: "Returns tracker dashboard",

    async execute(input) {

        return getTrackerDashboard(

            input.page ?? 1,

            input.search ?? "",

            input.limit ?? 10

        );

    }

});