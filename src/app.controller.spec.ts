import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getKey', () => {
    it('should return exception to unknown key', async () => {
      await expect(appController.getKey('asdf')).rejects.toThrow(NotFoundException);
    });
    
    it('should return key value', async () => {

      let createKeyDto = {
        name:'asdf',
        value: '123'
      }
      await appController.createKey(createKeyDto);
      expect(await appController.getKey('asdf')).toBe('123');
    });
  });

  describe('createKey', () => {
    let createKeyDto = {
      name:'asdf',
      value: '123'
    }
    it('should return the value string to unknown key', async () => {
      expect(await appController.createKey(createKeyDto)).toBe('123');
    });
    
    it('should not return last recent key', async () => {
 
      await appController.createKey({name:'a', value: '123'});
      await appController.createKey({name:'b', value: '12'});
      await appController.createKey({name:'c',value: '13'});
      await appController.createKey({name:'d',value: '14'});

      await expect(appController.getKey('a')).rejects.toThrow(NotFoundException);
      expect(await appController.getKey('b')).toBe('12');
      expect(await appController.getKey('c')).toBe('13');
      expect(await appController.getKey('d')).toBe('14');
    });
  });
});
