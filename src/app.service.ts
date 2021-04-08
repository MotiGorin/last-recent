import { Injectable } from '@nestjs/common';
import { KeyValue } from './key_value.entity';
import { LinkedList } from './linked_list.entity';

const MAX_CONCURRENT_KEYS = 3;

@Injectable()
export class AppService {
  private keysHash: Map<string,KeyValue> = new Map<string,KeyValue>();

  private lastRecentList: LinkedList<string> = new LinkedList<string>();

  async getHello(): Promise<string> {
    return "Hello";
  }

  async getKey(key: string): Promise<KeyValue> {
    let result = this.keysHash.get(key) ?? new KeyValue();
    if(result.value !== undefined)
    {
        await this.lastRecentList.deleteNode(result.lastRecent);
        await this.lastRecentList.insertInBegin(key);
    }

    return result;
  }
  
  async setKey(name: string, value: string): Promise<KeyValue> {
    let key = await this.getKey(name);
    
    if(key.value !== undefined){
      key.value = value
    }
    else if (this.keysHash.size < MAX_CONCURRENT_KEYS)
    {
      key = await this.createKey(name, value);
    }
    else {      
      let lastNode = await this.lastRecentList.getLastNode();
      this.keysHash.delete(lastNode.data);
      await this.lastRecentList.deleteNode(lastNode);
      key = await this.createKey(name, value);
    }

    return key;
  }

  private async createKey(name: string, value: string): Promise<KeyValue>{
    let key = new KeyValue();
    key.value = value;
    key.lastRecent = await this.lastRecentList.insertInBegin(name);
    this.keysHash.set(name,key);
    return key;
  }
}
