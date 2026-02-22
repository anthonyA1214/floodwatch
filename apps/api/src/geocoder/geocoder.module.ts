import { Module } from '@nestjs/common';
import { GeocoderService } from './geocoder.service';

@Module({
  exports: [GeocoderService],
  providers: [GeocoderService],
})
export class GeocoderModule {}
