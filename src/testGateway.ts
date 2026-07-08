import "./tools/tracker.js";

import { executeTool } from "./ai/gateway.js";

(async () => {

    const data = await executeTool(

        "tracker_dashboard",

        {

            page:1,

            search:"",

            limit:10

        }

    );

    console.log(data.data.businesses.length);

})();