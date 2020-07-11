import * as Client from "./database/db";
import { CosmosClient } from "@azure/cosmos";
import * as config from "./database/config";

const databaseId = config.databaseId;
const containerId = config.containerId;
const client = new CosmosClient(Client.options);


export async function addToDb(datas: any, i: any, remaining:any) {
    console.log("Inside addToDb :",i);
    console.log("Remaining :",remaining)
      const create = [];
    const container = client.database(databaseId).container(containerId);
    for (var dataIndex = i; dataIndex < i + remaining; dataIndex++) {
      create.push(container.items.create(datas[dataIndex]));
    }
    return Promise.all(create);
  }