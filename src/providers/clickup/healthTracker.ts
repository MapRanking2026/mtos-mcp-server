import axios from "axios";
import "dotenv/config";

const clickup = axios.create({
  baseURL: "https://api.clickup.com/api/v2",
  headers: {
    Authorization: process.env.CLICKUP_API_TOKEN,
  },
});

const HEALTH_TRACKER_LIST_ID = process.env.CLICKUP_HEALTH_TRACKER_LIST_ID;
const SERVICES_FIELD_NAME = "⭐ Services";

type ClickUpCustomField = {
  name: string;
  value: string[] | null;
  type_config?: { options?: Array<{ id: string; label?: string; name?: string }> };
};

type ClickUpTask = {
  name: string;
  custom_fields: ClickUpCustomField[];
};

const findClientTask = async (
  businessName: string
): Promise<ClickUpTask | undefined> => {
  const normalized = businessName.trim().toLowerCase();
  let page = 0;

  while (true) {
    const res = await clickup.get(`/list/${HEALTH_TRACKER_LIST_ID}/task`, {
      params: { page, include_closed: true },
    });

    const tasks: ClickUpTask[] = res.data.tasks;
    const match = tasks.find((t) => t.name.trim().toLowerCase() === normalized);
    if (match) return match;

    if (tasks.length === 0) return undefined;
    page++;
  }
};

export const getClientActiveServices = async (
  businessName: string
): Promise<string[]> => {
  const task = await findClientTask(businessName);
  if (!task) return [];

  const servicesField = task.custom_fields.find(
    (f) => f.name === SERVICES_FIELD_NAME
  );
  if (!servicesField || !servicesField.value) return [];

  const options = servicesField.type_config?.options ?? [];
  return servicesField.value.map((id) => {
    const option = options.find((o) => o.id === id);
    return option?.label ?? option?.name ?? id;
  });
};
