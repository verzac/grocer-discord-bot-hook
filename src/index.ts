import { APIGatewayProxyHandler } from "aws-lambda";
import Axios from "axios";
import axiosInstance from "./clients/axios";

export const handleProxy: APIGatewayProxyHandler = async (e) => {
  const body = JSON.parse(e.body ?? "");
  if (!body.content) {
    return {
      statusCode: 400,
      body: "No content.",
    };
  }
  if (body.check !== "grocerybot is the coolest bot") {
    return {
      statusCode: 400,
      body: "Must have check value (to prevent accidental DDOS).",
    };
  }
  const proxiedPath = e.pathParameters?.proxy;
  if (!proxiedPath) {
    return {
      statusCode: 500,
      body: "No proxiedPath.",
    };
  }
  try {
    await axiosInstance.post(
      `https://discord.com/api/webhooks/${proxiedPath}`,
      {
        content: body.content,
      }
    );
  } catch (e) {
    console.error(e);
    if (Axios.isAxiosError(e)) {
      return {
        statusCode: e.response?.status ?? 500,
        body: e.response?.data,
      };
    }
    return {
      statusCode: 500,
      body: "Cannot proxy request. Unknown error (see logs).",
    };
  }
  return {
    statusCode: 204,
    body: "",
  };
};
