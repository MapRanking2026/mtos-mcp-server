import { registry } from "./registry.js";

export async function executeTool(
    name: string,
    input: any
) {

    const tool = registry.get(name);

    if (!tool) {

        throw new Error(`Unknown tool ${name}`);

    }

    return tool.execute(input);

}