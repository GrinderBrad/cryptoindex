import { Test, TestingModule } from '@nestjs/testing';
import { KrakenProviderService } from './kraken.provider.service';

describe('KrakenProviderService', () => {
  let service: KrakenProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KrakenProviderService],
    }).compile();

    service = module.get<KrakenProviderService>(KrakenProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
